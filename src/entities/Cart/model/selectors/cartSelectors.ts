import { StoreSchema } from '@/shared/types/store';
import { createSelector } from 'reselect';

const getIsOpen = (state: StoreSchema) => state.cart.isOpen;
const getCartData = (state: StoreSchema) => state.cart.cartData;
const getCartItems = (state: StoreSchema) => state.cart.cartData?.items || [];
const memoizedCartItems = createSelector(getCartItems, (cartItems) => cartItems);
const getIsCartFetching = (state: StoreSchema) => state.cart.isFetching;
const getCartIsLoading = (state: StoreSchema) => state.cart.isLoading;
const getCartHasError = (state: StoreSchema) => state.cart.isError;
const getCartProductQuantity = createSelector(
  getCartItems,
  (items) => items.reduce((acc, item) => acc + item.quantity, 0),
);

const getCart = (state: StoreSchema) => state.cart;

export const cartSelectors = {
  getIsOpen,
  getCartData,
  getCartItems: memoizedCartItems,
  getIsCartFetching,
  getCartIsLoading,
  getCartHasError,
  getCart,
  getCartProductQuantity,
};
