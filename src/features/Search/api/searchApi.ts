import { rtkApi } from '@/shared/api/rtkApi';
import { SearchDto } from './types';

type GetProductsParams = {
  search: string;
};

export const searchApi = rtkApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getSearchResult: build.query<SearchDto, GetProductsParams>({
      query: ({ search = '' }) => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/suggests`,
        params: {
          q: search,
        },
      }),
    }),
  }),
});

export const {
  useGetSearchResultQuery,
  endpoints: { getSearchResult },
} = searchApi;
