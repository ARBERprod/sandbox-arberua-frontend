import { rtkApi, PRODUCT_COMMENTS_TAG, SELLER_COMMENTS_TAG } from '@/shared/api/rtkApi';
import { SuccessApiResponseWithMeta } from '@/shared/types/api';
import { Consultation } from '@/entities/Consultation';

import { officeReviewsMapper } from '../lib/officeReviewsMapper';
import { ProductReviewDto, SellerReviewDto } from './types';
import { ProductReview } from '../model/types';

export const officeReviewsApi = rtkApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getProductReviews: build.query<SuccessApiResponseWithMeta<ProductReview[]>, { page?: number }>({
      query: ({ page = 1 }) => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/profile/comments/products`,
        params: {
          page,
        },
      }),
      transformResponse: (
        response: SuccessApiResponseWithMeta<ProductReviewDto[]>,
      ): SuccessApiResponseWithMeta<ProductReview[]> => ({
        meta: response.meta,
        success: response.success,
        data: response.data.map(officeReviewsMapper.mapProductReviews),
      }),
      providesTags: [PRODUCT_COMMENTS_TAG],
    }),
    getSellerReviews: build.query<SuccessApiResponseWithMeta<Consultation[]>, { page?: number }>({
      query: ({ page }) => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/profile/comments/staff`,
        params: {
          page,
        },
      }),
      transformResponse: (
        response: SuccessApiResponseWithMeta<SellerReviewDto[]>,
      ): SuccessApiResponseWithMeta<Consultation[]> => ({
        meta: response.meta,
        success: response.success,
        data: response.data.map(officeReviewsMapper.mapSellerReviews),
      }),
      providesTags: [SELLER_COMMENTS_TAG],
    }),
  }),
});

export const { useGetProductReviewsQuery, useGetSellerReviewsQuery } = officeReviewsApi;
