import { cartReducer } from './cartSlice';
import { cartApi } from '../../api/cartApi';
import type { CartSchema } from '../types/cartSchema';
import type { CartData } from '../types/types';

const baseState: CartSchema = {
  isOpen: false,
  cartData: null,
  isFetching: true,
  isLoading: true,
  isError: false,
};

const EMPTY_CART: CartData = {
  totals: [],
  items: [],
  total: 0,
  quantity: 0,
  promocode: null,
};

const mutationAction = (
  endpointName: string,
  requestStatus: 'pending' | 'fulfilled',
  payload?: CartData,
) => ({
  type: `api/executeMutation/${requestStatus}`,
  payload,
  meta: {
    arg: {
      endpointName,
      type: 'mutation',
      originalArgs: undefined,
      fixedCacheKey: undefined,
    },
    requestId: 'req-id',
    requestStatus,
    fulfilledTimeStamp: Date.now(),
    startedTimeStamp: Date.now(),
    baseQueryMeta: {},
    RTK_autoBatch: true,
  },
});

// Regression guard for the copy-paste bug where deleteProduct/updateProduct used a
// second matchFulfilled (instead of matchPending), leaving isFetching stuck true.
describe('cartSlice fetching flags — delete/update', () => {
  it.each(['deleteProduct', 'updateProduct'])('clears isFetching when "%s" is fulfilled', (endpointName) => {
    const fulfilled = mutationAction(endpointName, 'fulfilled', EMPTY_CART);
    expect((cartApi.endpoints as any)[endpointName].matchFulfilled(fulfilled)).toBe(true);

    const next = cartReducer(baseState, fulfilled);

    expect(next.isFetching).toBe(false);
    expect(next.cartData).toEqual(EMPTY_CART);
  });

  it.each(['deleteProduct', 'updateProduct'])('sets isFetching while "%s" is pending', (endpointName) => {
    const pending = mutationAction(endpointName, 'pending');
    expect((cartApi.endpoints as any)[endpointName].matchPending(pending)).toBe(true);

    const next = cartReducer({ ...baseState, isFetching: false }, pending);

    expect(next.isFetching).toBe(true);
  });
});
