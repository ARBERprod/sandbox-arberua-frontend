import { rtkApi } from '@/shared/api/rtkApi';
import { DetailedStaff } from '../model/types';
import { SuccessApiResponse } from '@/shared/types/api';

const staffApi = rtkApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getStaff: build.query<DetailedStaff, {slug: string}>({
      query: ({ slug }) => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/staff/${slug}`,
      }),
      transformResponse: (response: SuccessApiResponse<DetailedStaff>) => response.data,
    }),
  }),
});

export const {
  endpoints: {
    getStaff,
  },
} = staffApi;
