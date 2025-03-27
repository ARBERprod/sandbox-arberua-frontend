import { buildSlice } from '@/shared/lib/utils/buildSlice';
import { sessionApi } from '@/entities/Session';
import { wishListApi } from '@/entities/WishList/api/wishListApi';
import { WishListSchema } from '../types/WishListSchema';

const initialState:WishListSchema = {
  isFetching: false,
  isLoading: true,
  products: [],
  isError: false,
};

const wishListSlice = buildSlice({
  name: 'wish-list',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(sessionApi.endpoints.sessionFetch.matchFulfilled, (state, action) => {
      state.isLoading = false;
      state.isFetching = false;
      state.products = action.payload.data.wishlist || [];
    });
    builder.addMatcher(sessionApi.endpoints.sessionFetch.matchPending, (state) => {
      state.isFetching = true;
    });
    builder.addMatcher(sessionApi.endpoints.sessionFetch.matchRejected, (state) => {
      state.isError = true;
      state.isFetching = false;
      state.isLoading = false;
    });

    builder.addMatcher(wishListApi.endpoints.toggleProductInWishList.matchFulfilled, (state, action) => {
      state.isError = false;
      state.isFetching = false;
      state.products = action.payload;
    });
    builder.addMatcher(wishListApi.endpoints.toggleProductInWishList.matchPending, (state) => {
      state.isFetching = true;
      state.isError = false;
    });
    builder.addMatcher(wishListApi.endpoints.toggleProductInWishList.matchRejected, (state) => {
      state.isError = true;
    });

    builder.addMatcher(wishListApi.endpoints.clearWishList.matchFulfilled, (state, action) => {
      state.isError = false;
      state.isFetching = false;
      state.products = action.payload;
    });
    builder.addMatcher(wishListApi.endpoints.clearWishList.matchPending, (state) => {
      state.isFetching = true;
      state.isError = false;
    });
    builder.addMatcher(wishListApi.endpoints.clearWishList.matchRejected, (state) => {
      state.isError = true;
    });
  },
});

export const { reducer: wishListReducer } = wishListSlice;
