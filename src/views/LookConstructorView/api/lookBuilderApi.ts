import { rtkApi } from '@/shared/api/rtkApi';
import { SuccessApiResponse } from '@/shared/types/api';

type ConstructorItem = {
  id: string;
  title: string;
}

export const lookBuilderApi = rtkApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getConstructors: build.query<ConstructorItem[], void>({
      query: () => ({
        url: '/constructors',
      }),
      transformResponse: (response: SuccessApiResponse<ConstructorItem[]>) => response.data,
    }),
  }),
});

export const {
  endpoints: {
    getConstructors,
  },
  useGetConstructorsQuery,
} = lookBuilderApi;
