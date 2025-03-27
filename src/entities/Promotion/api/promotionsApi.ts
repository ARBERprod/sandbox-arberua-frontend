import { rtkApi } from '@/shared/api/rtkApi';
import { SuccessApiResponseWithMeta } from '@/shared/types/api';
import { PromotionsItem } from '../model/types/Promotions';

const promotionsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getPromotions: build.query<SuccessApiResponseWithMeta<PromotionsItem[]>, void>({
      query: () => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/shares`,
      }),
    }),
  }),
});

export const {
  endpoints: { getPromotions },
  useGetPromotionsQuery,
} = promotionsApi;
