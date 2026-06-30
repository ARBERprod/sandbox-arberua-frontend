import { buildSlice } from '@/shared/lib/utils/buildSlice';
import { sessionApi, refetchSession } from '@/entities/Session';
import { PayloadAction } from '@reduxjs/toolkit';
import { cartApi } from '@/entities/Cart';
import { CartData } from '../types/types';
import { CartSchema } from '../types/cartSchema';

const initialState: CartSchema = {
  isOpen: false,
  cartData: null,
  isFetching: false,
  isLoading: true,
  isError: false,
};

export const cartSlice = buildSlice({
  name: 'cart',
  initialState,
  reducers: {
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
    setCartData: (state, action: PayloadAction<CartData>) => {
      state.cartData = action.payload;
    },
  },
  extraReducers: (builder) => {
    // addCase must come before addMatcher
    builder.addCase(refetchSession.fulfilled, (state, action) => {
      state.cartData = action.payload.data.cart;
      state.isFetching = false;
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(refetchSession.pending, (state) => {
      state.isFetching = true;
      state.isError = false;
    });
    builder.addCase(refetchSession.rejected, (state) => {
      state.isError = true;
      state.isFetching = false;
    });

    builder.addMatcher(sessionApi.endpoints.sessionFetch.matchFulfilled, (state, action) => {
      state.cartData = action.payload.data.cart;
      state.isFetching = false;
      state.isLoading = false;
      state.isError = false;
    });
    builder.addMatcher(sessionApi.endpoints.sessionFetch.matchPending, (state) => {
      state.isFetching = true;
      state.isError = false;
    });
    builder.addMatcher(sessionApi.endpoints.sessionFetch.matchRejected, (state) => {
      state.isError = true;
    });

    builder.addMatcher(cartApi.endpoints.addProductToCart.matchFulfilled, (state, action) => {
      state.isFetching = false;
      state.isError = false;
      state.cartData = action.payload;
    });
    builder.addMatcher(cartApi.endpoints.addProductToCart.matchPending, (state) => {
      state.isFetching = true;
      state.isError = false;
    });
    builder.addMatcher(cartApi.endpoints.addProductToCart.matchRejected, (state) => {
      state.isError = true;
    });

    builder.addMatcher(cartApi.endpoints.addManyProductsToCart.matchFulfilled, (state, action) => {
      state.isFetching = false;
      state.isError = false;
      state.cartData = action.payload;
    });
    builder.addMatcher(cartApi.endpoints.addManyProductsToCart.matchPending, (state) => {
      state.isFetching = true;
      state.isError = false;
    });
    builder.addMatcher(cartApi.endpoints.addManyProductsToCart.matchRejected, (state) => {
      state.isError = true;
    });

    builder.addMatcher(cartApi.endpoints.deleteCart.matchFulfilled, (state, action) => {
      state.isFetching = false;
      state.isError = false;
      state.cartData = action.payload;
    });
    builder.addMatcher(cartApi.endpoints.deleteCart.matchPending, (state) => {
      state.isFetching = true;
      state.isError = false;
    });
    builder.addMatcher(cartApi.endpoints.deleteCart.matchRejected, (state) => {
      state.isError = true;
    });

    builder.addMatcher(cartApi.endpoints.deleteProduct.matchFulfilled, (state, action) => {
      state.isFetching = false;
      state.isError = false;
      state.cartData = action.payload;
    });
    builder.addMatcher(cartApi.endpoints.deleteProduct.matchPending, (state) => {
      state.isFetching = true;
      state.isError = false;
    });
    builder.addMatcher(cartApi.endpoints.deleteProduct.matchRejected, (state) => {
      state.isError = true;
    });

    builder.addMatcher(cartApi.endpoints.updateProduct.matchFulfilled, (state, action) => {
      state.isFetching = false;
      state.isError = false;
      state.cartData = action.payload;
    });
    builder.addMatcher(cartApi.endpoints.updateProduct.matchPending, (state) => {
      state.isFetching = true;
      state.isError = false;
    });
    builder.addMatcher(cartApi.endpoints.updateProduct.matchRejected, (state) => {
      state.isError = true;
    });

    builder.addMatcher(cartApi.endpoints.applyPromocode.matchFulfilled, (state, action) => {
      state.isFetching = false;
      state.isError = false;
      state.cartData = action.payload;
    });
    builder.addMatcher(cartApi.endpoints.applyPromocode.matchPending, (state) => {
      state.isFetching = true;
      state.isError = false;
    });
    builder.addMatcher(cartApi.endpoints.applyPromocode.matchRejected, (state) => {
      state.isFetching = false;
    });

    builder.addMatcher(cartApi.endpoints.removePromocode.matchFulfilled, (state, action) => {
      state.isFetching = false;
      state.isError = false;
      state.cartData = action.payload;
    });
    builder.addMatcher(cartApi.endpoints.removePromocode.matchPending, (state) => {
      state.isFetching = true;
      state.isError = false;
    });
    builder.addMatcher(cartApi.endpoints.removePromocode.matchRejected, (state) => {
      state.isFetching = false;
    });
  },

});

export const { reducer: cartReducer } = cartSlice;
export const { useActions: useCartActions } = cartSlice;
