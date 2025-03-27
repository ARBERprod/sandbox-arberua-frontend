import { rtkApi } from '@/shared/api/rtkApi';
import { SearchedProductsDto, SearchedProductsOptions } from './types';

const searchProductsApi = rtkApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getSearchedProducts: build.query<SearchedProductsDto, SearchedProductsOptions>({
      query: ({
        query, page, filters, sort,
      }) => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/search${filters ? `?${filters}` : ''}`,
        params: {
          q: query,
          page,
          sort,
        },
      }),
    }),
  }),
});

export const { endpoints: { getSearchedProducts }, useGetSearchedProductsQuery } = searchProductsApi;
