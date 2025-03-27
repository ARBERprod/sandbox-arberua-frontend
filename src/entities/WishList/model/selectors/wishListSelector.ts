import { StoreSchema } from '@/shared/types/store';

const getIsFetching = (state: StoreSchema) => state.wishList.isFetching;
const getIsError = (state: StoreSchema) => state.wishList.isError;
const getIsLoading = (state: StoreSchema) => state.wishList.isLoading;
const getProducts = (state: StoreSchema) => state.wishList.products;
const getWishList = (state: StoreSchema) => state.wishList;

export const wishListSelector = {
  getIsFetching,
  getIsError,
  getIsLoading,
  getProducts,
  getWishList,
};
