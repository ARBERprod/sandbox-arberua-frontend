import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import {
  HOME_PAGE_DATA_TAG,
  PRODUCT_COMMENTS_TAG,
  SESSION_TAG,
  CART_TAG,
  WISHLIST_TAG,
  SELLER_COMMENTS_TAG,
  PRODUCTS_HISTORY,
} from './tags';
import { baseQueryWithReauth } from './baseQueryWithReauth';

export const rtkApi = createApi({
  reducerPath: 'api',
  tagTypes: [
    SESSION_TAG,
    PRODUCT_COMMENTS_TAG,
    CART_TAG,
    HOME_PAGE_DATA_TAG,
    WISHLIST_TAG,
    SELLER_COMMENTS_TAG,
    PRODUCTS_HISTORY,
  ],
  baseQuery: baseQueryWithReauth,
  // eslint-disable-next-line
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: () => ({}),
});

export const { getRunningQueriesThunk } = rtkApi.util;
