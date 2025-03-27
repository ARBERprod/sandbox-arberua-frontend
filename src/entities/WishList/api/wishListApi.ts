import { rtkApi, HOME_PAGE_DATA_TAG } from '@/shared/api/rtkApi';

import { Product } from '@/entities/Product';
import { SuccessApiResponse } from '@/shared/types/api';

export const wishListApi = rtkApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    toggleProductInWishList: build.mutation<Product[], { product_id: string }>({
      query: (body) => ({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/wishlists/${body.product_id}/product`,
      }),
      transformResponse: (response: SuccessApiResponse<Product[]>) => response.data,
      invalidatesTags: [HOME_PAGE_DATA_TAG],
    }),
    clearWishList: build.mutation<Product[], void>({
      query: () => ({
        method: 'DELETE',
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/wishlists/truncate`,
      }),
      transformResponse: (response: SuccessApiResponse<Product[]>) => response.data,
      invalidatesTags: [HOME_PAGE_DATA_TAG],
    }),
  }),
});

export const {
  useToggleProductInWishListMutation,
  useClearWishListMutation,
} = wishListApi;
