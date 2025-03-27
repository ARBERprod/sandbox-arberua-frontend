import { rtkApi } from '@/shared/api/rtkApi';
import { SuccessApiResponseWithMeta } from '@/shared/types/api';
import { Instagram } from '../model/types/types';

const instagramApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getInstagrams: build.query<SuccessApiResponseWithMeta<Instagram[]>, {page?: number}>({
      query: ({ page = 1 }) => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/instagrams`,
        params: {
          page,
        },
      }),
    }),
  }),
});

export const { useGetInstagramsQuery, endpoints: { getInstagrams } } = instagramApi;
