import { configureStore, createAction, Reducer } from '@reduxjs/toolkit';
import type { PromocodeMeta } from '../../types/types';

// Mock the notification surface so we can assert side effects without touching
// react-toastify. notify() is the function the listener actually invokes.
const mockNotify = jest.fn();
jest.mock('@/shared/ui/Notification', () => ({
  getNotify: jest.fn(() => ({ notify: mockNotify })),
}));

// Mock i18next so we don't depend on initialised resources here.
jest.mock('i18next', () => ({
  t: jest.fn((_key: string, opts?: { defaultValue?: string }) => opts?.defaultValue ?? _key),
}));

/* eslint-disable @typescript-eslint/no-var-requires, global-require */
const { getNotify } = require('@/shared/ui/Notification') as { getNotify: jest.Mock };
const { promocodeInvalidationListener } = require('../promocodeInvalidationListener');
const { cartApi } = require('../../../api/cartApi');
/* eslint-enable */

type CartState = { cartData: { promocode: PromocodeMeta | null } | null };

const APPLIED: PromocodeMeta = {
  code: 'SALE15', discount: 15, period_to: null, total_discount: 15000,
};

// Seed action lets each test set the "before" state cleanly.
const seed = createAction<{ promocode: PromocodeMeta | null }>('test/seed');

// Tiny cart reducer that mirrors prod behaviour: any RTKQ-fulfilled mutation
// payload replaces cartData entirely. That way prev/next promocode tracks the
// action payload — same invariant the real cartSlice maintains.
const initialCart: CartState = { cartData: null };
const cartReducer: Reducer<CartState, any> = (state, action) => {
  const current = state ?? initialCart;
  if (seed.match(action)) {
    return { cartData: { promocode: action.payload.promocode } };
  }
  if (action?.type === 'api/executeMutation/fulfilled') {
    return { cartData: { promocode: action.payload?.promocode ?? null } };
  }
  return current;
};

const makeStore = () => configureStore({
  reducer: { cart: cartReducer },
  middleware: (gDM) => gDM({ serializableCheck: false, immutableCheck: false })
    .prepend(promocodeInvalidationListener.middleware),
});

// Hand-rolled fulfilled action matching `cartApi.endpoints.X.matchFulfilled`.
const fulfilledAction = (
  endpointName: string,
  payload: Partial<{ promocode: PromocodeMeta | null }> = {},
) => ({
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
});

describe('promocodeInvalidationListener', () => {
  describe('matcher coverage — fires on every implicit cart mutation', () => {
    const endpoints = [
      'addProductToCart',
      'addManyProductsToCart',
      'updateProduct',
      'deleteProduct',
      'deleteCart',
    ];

    it.each(endpoints)('fires the toast when "%s" wipes an applied promocode', (endpointName) => {
      const store = makeStore();
      store.dispatch(seed({ promocode: APPLIED }));
      jest.clearAllMocks();

      // Sanity: the hand-rolled action must satisfy the matcher we expect.
      const action = fulfilledAction(endpointName, { promocode: null });
      expect((cartApi.endpoints as any)[endpointName].matchFulfilled(action)).toBe(true);

      store.dispatch(action);

      expect(getNotify).toHaveBeenCalledTimes(1);
      expect(getNotify).toHaveBeenCalledWith({
        type: 'info',
        content: 'checkout-page:promocode.toast.cart_changed',
      });
      expect(mockNotify).toHaveBeenCalledTimes(1);
    });
  });

  describe('no-op branches', () => {
    it('does NOT fire when there was no applied promocode before (null → null)', () => {
      const store = makeStore();
      store.dispatch(seed({ promocode: null }));
      jest.clearAllMocks();

      store.dispatch(fulfilledAction('addProductToCart', { promocode: null }));
      expect(getNotify).not.toHaveBeenCalled();
      expect(mockNotify).not.toHaveBeenCalled();
    });

    it('does NOT fire when the promocode stays applied (APPLIED → APPLIED)', () => {
      const store = makeStore();
      store.dispatch(seed({ promocode: APPLIED }));
      jest.clearAllMocks();

      store.dispatch(fulfilledAction('updateProduct', { promocode: APPLIED }));
      expect(getNotify).not.toHaveBeenCalled();
    });

    it('does NOT fire when promocode appears for the first time (null → APPLIED)', () => {
      // Implicit cart mutations don't set a new promocode in practice, but the
      // guard `prev !== null && next === null` must reject this direction too.
      const store = makeStore();
      store.dispatch(seed({ promocode: null }));
      jest.clearAllMocks();

      store.dispatch(fulfilledAction('addProductToCart', { promocode: APPLIED }));
      expect(getNotify).not.toHaveBeenCalled();
    });
  });

  describe('apply/remove are excluded', () => {
    it('does NOT fire on applyPromocode.matchFulfilled even if promocode goes null', () => {
      // Synthetic: in real flow applyPromocode → promocode != null. But the
      // matcher itself must not be in the listener's set.
      const store = makeStore();
      store.dispatch(seed({ promocode: APPLIED }));
      jest.clearAllMocks();

      store.dispatch(fulfilledAction('applyPromocode', { promocode: null }));
      expect(getNotify).not.toHaveBeenCalled();
    });

    it('does NOT fire on removePromocode.matchFulfilled (user-initiated removal)', () => {
      const store = makeStore();
      store.dispatch(seed({ promocode: APPLIED }));
      jest.clearAllMocks();

      store.dispatch(fulfilledAction('removePromocode', { promocode: null }));
      expect(getNotify).not.toHaveBeenCalled();
    });
  });

  describe('contract drift', () => {
    it('applyPromocode.matchFulfilled with promocode: null (server silently rejected) → no toast', () => {
      // Backend contract: apply should return promocode != null on success.
      // But even if it ever ships a null in the payload, the listener must
      // still ignore apply/remove matchers — only implicit mutations toast.
      const store = makeStore();
      store.dispatch(seed({ promocode: null }));
      jest.clearAllMocks();

      store.dispatch(fulfilledAction('applyPromocode', { promocode: null }));
      expect(getNotify).not.toHaveBeenCalled();
    });
  });

  describe('back-to-back implicit mutations (Edge Case 3 — documents toast multiplicity)', () => {
    it('fires the toast on the first invalidating mutation; subsequent null→null mutations are silent', () => {
      const store = makeStore();
      store.dispatch(seed({ promocode: APPLIED }));
      jest.clearAllMocks();

      // 1st mutation invalidates the promocode → one toast.
      store.dispatch(fulfilledAction('addProductToCart', { promocode: null }));
      // 2nd mutation finds promocode already null → no second toast (guard:
      // `prev !== null && next === null`).
      store.dispatch(fulfilledAction('updateProduct', { promocode: null }));

      expect(mockNotify).toHaveBeenCalledTimes(1);
    });
  });

  describe('SSR guard', () => {
    const originalWindow = global.window;

    afterEach(() => {
      (global as any).window = originalWindow;
    });

    it('does NOT call getNotify when window is undefined (SSR)', () => {
      delete (global as any).window;

      const store = makeStore();
      store.dispatch(seed({ promocode: APPLIED }));
      jest.clearAllMocks();

      store.dispatch(fulfilledAction('addProductToCart', { promocode: null }));
      expect(getNotify).not.toHaveBeenCalled();
    });
  });
});
