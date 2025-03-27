import { rtkApi } from '@/shared/api/rtkApi';
import { SuccessApiResponse } from '@/shared/types/api';

interface RedirectDto {
  destination: string;
}

export const redirectsApi = rtkApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getPageRedirect: build.query({
      query: ({ slug }) => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/redirects/product?source=/${slug}`,
      }),
      transformResponse(response: SuccessApiResponse<RedirectDto[]>) {
        return response;
      },
    }),

  }),
});

export const {
  endpoints: {
    getPageRedirect,
  },
} = redirectsApi;
