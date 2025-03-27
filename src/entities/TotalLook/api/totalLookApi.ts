import { rtkApi } from '@/shared/api/rtkApi';
import { SuccessApiResponse } from '@/shared/types/api';
import { TotalLookData, TotalLookParams, TotalLooksDto } from './types';

export const totalLookApi = rtkApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getTotalLookCatalog: build.query<TotalLooksDto, TotalLookParams>({
      query: ({ type, page = 1 }) => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/looks`,
        params: {
          page, type,
        },
      }),
      merge(
        currentCacheData: TotalLooksDto,
        responseData: TotalLooksDto,
        otherArgs,
      ): void | TotalLooksDto {
        if (otherArgs.arg.merge) {
          currentCacheData.data.looks.push(...responseData.data.looks);
          // eslint-disable-next-line
          currentCacheData.meta = responseData.meta;
        } else {
          return responseData;
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
      serializeQueryArgs: ({ endpointName }) => endpointName,
    }),
    getTotalLook: build.query<TotalLookData, {slug: string}>({
      query: ({ slug }) => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/looks/${slug}`,
      }),
      transformResponse: (response: SuccessApiResponse<TotalLookData>) => response.data,
    }),
  }),
});

export const {
  endpoints: {
    getTotalLookCatalog, getTotalLook,
  },
  useGetTotalLookCatalogQuery,
  useGetTotalLookQuery,
} = totalLookApi;
