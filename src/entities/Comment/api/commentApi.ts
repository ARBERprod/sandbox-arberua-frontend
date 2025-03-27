import { rtkApi, PRODUCT_COMMENTS_TAG, SELLER_COMMENTS_TAG } from '@/shared/api/rtkApi';

import { CommentsDto, ProductReviewBody, SellerReviewBody } from './types';

export const commentApi = rtkApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getProductComments: build.query<CommentsDto, { productId: string, page: number }>({
      query: ({
        productId,
        page = 1,
      }) => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/products/${productId}/comments`,
        params: {
          page,
        },
      }),
      providesTags: [PRODUCT_COMMENTS_TAG],
    }),
    addProductComment: build.mutation<void, ProductReviewBody>({
      query: (body) => ({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/products/${body.product_id}/comments`,
        body: {
          content: body.content,
          rating: body.rating,
        },
      }),
      invalidatesTags: (result, error) => (error ? [] : [PRODUCT_COMMENTS_TAG]),
    }),
    addSellerComment: build.mutation<void, SellerReviewBody>({
      query: ({ sellerId, content, rating }) => ({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/staff/${sellerId}/comments`,
        body: {
          content, rating,
        },
      }),
      invalidatesTags: (result, error) => (error ? [] : [SELLER_COMMENTS_TAG]),
    }),
    getSellerComments: build.query<CommentsDto, {sellerId: string}>({
      query: ({ sellerId }) => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/staff/${sellerId}/comments`,
      }),
      providesTags: [SELLER_COMMENTS_TAG],
    }),
  }),
});

export const {
  useGetProductCommentsQuery, useAddProductCommentMutation, useAddSellerCommentMutation, useGetSellerCommentsQuery,
} = commentApi;
