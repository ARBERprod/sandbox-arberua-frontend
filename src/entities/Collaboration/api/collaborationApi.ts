import { rtkApi } from '@/shared/api/rtkApi';
import { CollaborationsData, CollaborationsDto, CollaborationSingleDto } from './types';

type GetCollaborationParams = {
  collaboration_id: string;
  merge?: boolean;
  filters?: string;
  page?: number;
  sort?: string;
};

// The menu request sits on the TTFB path of every SSR page, and fetchBaseQuery is created
// without a default timeout — a hung (not failed) API would otherwise stall the whole site.
const COLLABORATIONS_TIMEOUT_MS = 1500;

export const collaborationApi = rtkApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getCollaborations: build.query<CollaborationsData, void>({
      query: () => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/collaborations`,
        timeout: COLLABORATIONS_TIMEOUT_MS,
      }),
      transformResponse: (response: CollaborationsDto) => response.data,
    }),
    getCollaboration: build.query<CollaborationSingleDto, GetCollaborationParams>({
      query: ({
        collaboration_id,
        filters,
        sort,
        page,
      }) => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/collaborations/${collaboration_id}?${filters ?? ''}`,
        params: {
          sort,
          page,
        },
      }),
      merge(
        currentCacheData: CollaborationSingleDto,
        responseData: CollaborationSingleDto,
        otherArgs,
      ): void | CollaborationSingleDto {
        if (otherArgs.arg.merge) {
          currentCacheData.data.products.push(...responseData.data.products);
          // eslint-disable-next-line
          currentCacheData.meta = responseData.meta;
        } else {
          return responseData;
        }
      },
      // The cache key drops the args (serializeQueryArgs below), so without collaboration_id here
      // a jump between two sections would render the products of the previous one.
      forceRefetch({
        currentArg,
        previousArg,
      }) {
        return currentArg?.collaboration_id !== previousArg?.collaboration_id
          || currentArg?.filters !== previousArg?.filters
          || currentArg?.page !== previousArg?.page
          || currentArg?.sort !== previousArg?.sort;
      },
      serializeQueryArgs: ({ endpointName }) => endpointName,
    }),
  }),
});

export const {
  endpoints: {
    getCollaborations,
    getCollaboration,
  },
  useGetCollaborationsQuery,
  useGetCollaborationQuery,
} = collaborationApi;
