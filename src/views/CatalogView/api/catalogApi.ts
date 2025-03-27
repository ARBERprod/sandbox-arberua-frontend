import { rtkApi } from '@/shared/api/rtkApi';
import { CatalogDto } from './types';

type GetProductsParams = {
  category: string;
  filters: string;
  merge?: boolean;
  page?: number;
  sort?: string | null;
}

export const catalogApi = rtkApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getCatalog: build.query<CatalogDto, GetProductsParams>({
      query: ({
        category, filters, sort, page,
      }) => ({
        url: filters
          ? `${process.env.NEXT_PUBLIC_API_URL_V2}/categories/${category}?${filters}`
          : `${process.env.NEXT_PUBLIC_API_URL_V2}/categories/${category}`,
        params: {
          sort, page,
        },
      }),
      merge(
        currentCacheData: CatalogDto,
        responseData: CatalogDto,
        otherArgs,
      ): void | CatalogDto {
        if (otherArgs.arg.merge) {
          currentCacheData.data.products.push(...responseData.data.products);
          // eslint-disable-next-line
          currentCacheData.meta = responseData.meta;
        } else {
          return responseData;
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return (
          currentArg?.page !== previousArg?.page
          || currentArg?.filters !== previousArg?.filters
          || currentArg?.sort !== previousArg?.sort
        );
      },
      serializeQueryArgs: ({ endpointName }) => endpointName,
    }),
  }),
});

export const { useGetCatalogQuery, endpoints: { getCatalog } } = catalogApi;
