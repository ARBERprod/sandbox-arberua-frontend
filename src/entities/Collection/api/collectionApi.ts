import { rtkApi } from '@/shared/api/rtkApi';
import { SuccessApiResponseWithMeta } from '@/shared/types/api';
import { CollectionsDto, CollectionSingleDto } from './types';

type GetCollectionParams = {
  collection_id: string;
  merge?: boolean;
  filters?: string;
  page?: number;
  sort?: string;
};

type GetCollectionsParams = {
  merge?: boolean;
  filters?: string;
  type?: string;
};

export const productApi = rtkApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getCollections: build.query<SuccessApiResponseWithMeta<CollectionsDto>, GetCollectionsParams>({
      query: ({
        filters,
        type,
      }) => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/collections?${filters}`,
        params: {
          type,
        },
      }),
      merge(
        currentCacheData: SuccessApiResponseWithMeta<CollectionsDto>,
        responseData: SuccessApiResponseWithMeta<CollectionsDto>,
        otherArgs,
      ): void | SuccessApiResponseWithMeta<CollectionsDto> {
        if (otherArgs.arg.merge) {
          currentCacheData.data.collections.push(...responseData.data.collections);
          // eslint-disable-next-line
          currentCacheData.meta = responseData.meta;
        } else {
          return responseData;
        }
      },
      forceRefetch({
        currentArg,
        previousArg,
      }) {
        return currentArg?.filters !== previousArg?.filters;
      },
      serializeQueryArgs: ({ endpointName }) => endpointName,
    }),
    getCollection: build.query<CollectionSingleDto, GetCollectionParams>({
      query: ({
        collection_id,
        filters,
        sort,
        page,
      }) => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/collections/${collection_id}?${filters}`,
        params: {
          sort,
          page,
        },
      }),
      merge(
        currentCacheData: CollectionSingleDto,
        responseData: CollectionSingleDto,
        otherArgs,
      ): void | CollectionSingleDto {
        if (otherArgs.arg.merge) {
          currentCacheData.data.products.push(...responseData.data.products);
          // eslint-disable-next-line
          currentCacheData.meta = responseData.meta;
        } else {
          return responseData;
        }
      },
      forceRefetch({
        currentArg,
        previousArg,
      }) {
        return currentArg?.filters !== previousArg?.filters || currentArg?.page !== previousArg?.page
          || currentArg?.sort !== previousArg?.sort;
      },
      serializeQueryArgs: ({ endpointName }) => endpointName,
    }),
  }),
});

export const {
  endpoints: {
    getCollections,
    getCollection,
  },
  useGetCollectionsQuery,
  useGetCollectionQuery,
} = productApi;
