import { rtkApi } from '@/shared/api/rtkApi';
import { FaqTab } from '@/views/FaqView/model/types/types';
import { SuccessApiResponse } from '@/shared/types/api';

const faqApi = rtkApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getFaqs: build.query<FaqTab[], void>({
      query: () => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/faqs`,
      }),
      transformResponse: (response: SuccessApiResponse<FaqTab[]>) => response.data,
    }),
  }),
});

export const { endpoints: { getFaqs }, useGetFaqsQuery } = faqApi;
