import { rtkApi } from '@/shared/api/rtkApi';
import { SuccessApiResponse } from '@/shared/types/api';
import { Breadcrumb } from '@/shared/ui/Breadcrumps';

type CustomPageData = {
  page: {
    title: string;
    description: string;
    url: string;
  };
  breadcrumbs: Breadcrumb[];
}

const customPageApi = rtkApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getCustomPageData: build.query<CustomPageData, { page: string }>({
      query: ({ page }) => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/pages/${page}`,
      }),
      transformResponse: (response: SuccessApiResponse<CustomPageData>) => response.data,
    }),
  }),
});

export const {
  endpoints: {
    getCustomPageData,
  },
  useGetCustomPageDataQuery,
} = customPageApi;
