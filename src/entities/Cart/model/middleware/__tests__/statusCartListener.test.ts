import { configureStore, createAction, Reducer } from '@reduxjs/toolkit';
import type { CartData, ICartItem } from '../../types/types';

// eSputnik analytics is fire-and-forget; mock the emitter and the GUID source so
// we can assert the StatusCart payload and that every mutation gets a fresh GUID.
const mockSendEsEvent = jest.fn();
jest.mock('@/shared/lib/analytics/esputnik', () => ({
  sendEsEvent: (...args: unknown[]) => mockSendEsEvent(...args),
}));

let guidCounter = 0;
const mockNextCartGuid = jest.fn(() => {
  guidCounter += 1;
  return `guid-${guidCounter}`;
});
jest.mock('@/shared/lib/analytics/esputnikCartGuid', () => ({
  nextCartGuid: () => mockNextCartGuid(),
}));

/* eslint-disable @typescript-eslint/no-var-requires, global-require */
const { statusCartListener } = require('../statusCartListener');
const { cartApi } = require('../../../api/cartApi');
/* eslint-enable */

const line = (id: string, parentId: string, price: number, quantity: number): ICartItem => ({
  id,
  parent_id: parentId,
  price: { value: price, symbol: '₴' },
  quantity,
}) as unknown as ICartItem;

const CART: CartData = {
  totals: [],
  total: 1990,
  quantity: 2,
  promocode: null,
  items: [line('v1', 'p1', 990, 2)],
};

type CartState = { cartData: CartData | null };
const seed = createAction<CartData | null>('test/seed');
const initialCart: CartState = { cartData: null };

// Mirror prod: any RTKQ-fulfilled cart mutation payload replaces cartData, so the
// listener reads the post-mutation cart from getState() — same invariant as cartSlice.
const cartReducer: Reducer<CartState, any> = (state, action) => {
  const current = state ?? initialCart;
  if (seed.match(action)) return { cartData: action.payload };
  if (action?.type === 'api/executeMutation/fulfilled') return { cartData: action.payload };
  return current;
};

const makeStore = () => configureStore({
  reducer: { cart: cartReducer },
  middleware: (gDM) => gDM({ serializableCheck: false, immutableCheck: false })
    .prepend(statusCartListener.middleware),
});

const fulfilledAction = (endpointName: string, payload: CartData | null) => ({
  type: 'api/executeMutation/fulfilled',
  payload,
  meta: {
    arg: {
      endpointName,
      type: 'mutation',
      originalArgs: undefined,
      fixedCacheKey: undefined,
    },
    requestId: 'req-id',
    requestStatus: 'fulfilled',
    fulfilledTimeStamp: Date.now(),
    startedTimeStamp: Date.now(),
    baseQueryMeta: {},
    RTK_autoBatch: true,
  },
});

beforeEach(() => {
  jest.clearAllMocks();
  guidCounter = 0;
});

describe('statusCartListener', () => {
  const endpoints = [
    'addProductToCart',
    'addManyProductsToCart',
    'updateProduct',
    'deleteProduct',
  ];

  it.each(endpoints)('emits one StatusCart with a fresh GUID on "%s"', (endpointName) => {
    const store = makeStore();
    const action = fulfilledAction(endpointName, CART);

    // Sanity: the hand-rolled action must satisfy the matcher we listen on.
    expect((cartApi.endpoints as any)[endpointName].matchFulfilled(action)).toBe(true);

    store.dispatch(action);

    expect(mockNextCartGuid).toHaveBeenCalledTimes(1);
    expect(mockSendEsEvent).toHaveBeenCalledTimes(1);
    expect(mockSendEsEvent).toHaveBeenCalledWith('StatusCart', {
      items: [{ productKey: 'p1', price: 990, quantity: 2 }],
      guid: 'guid-1',
    });
  });

  it('rotates the GUID on each successive mutation', () => {
    const store = makeStore();

    store.dispatch(fulfilledAction('addProductToCart', CART));
    store.dispatch(fulfilledAction('updateProduct', CART));

    const guids = mockSendEsEvent.mock.calls.map(([, payload]) => (payload as { guid: string }).guid);
    expect(guids).toEqual(['guid-1', 'guid-2']);
  });

  it('emits an empty items array when the last item is removed (deleteProduct → cart emptied)', () => {
    const store = makeStore();

    store.dispatch(fulfilledAction('deleteProduct', { ...CART, items: [] }));

    expect(mockSendEsEvent).toHaveBeenCalledWith('StatusCart', {
      items: [],
      guid: 'guid-1',
    });
  });

  it('does NOT emit on deleteCart (post-order truncate must not fire StatusCart)', () => {
    const store = makeStore();

    const action = fulfilledAction('deleteCart', { ...CART, items: [] });
    // Sanity: the action is a genuine deleteCart-fulfilled — it simply must be
    // ignored by the listener now that the matcher excludes deleteCart.
    expect((cartApi.endpoints as any).deleteCart.matchFulfilled(action)).toBe(true);

    store.dispatch(action);

    expect(mockSendEsEvent).not.toHaveBeenCalled();
    expect(mockNextCartGuid).not.toHaveBeenCalled();
  });

  it('falls back to the variant id when parent_id is missing', () => {
    const store = makeStore();
    const cartNoParent: CartData = { ...CART, items: [line('v9', '', 500, 1)] };

    store.dispatch(fulfilledAction('addProductToCart', cartNoParent));

    expect(mockSendEsEvent).toHaveBeenCalledWith('StatusCart', {
      items: [{ productKey: 'v9', price: 500, quantity: 1 }],
      guid: 'guid-1',
    });
  });

  describe('SSR guard', () => {
    const originalWindow = global.window;
    afterEach(() => { (global as any).window = originalWindow; });

    it('does NOT emit when window is undefined (SSR)', () => {
      delete (global as any).window;

      const store = makeStore();
      store.dispatch(fulfilledAction('addProductToCart', CART));

      expect(mockSendEsEvent).not.toHaveBeenCalled();
    });
  });
});
