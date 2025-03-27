import { rtkApi } from '@/shared/api/rtkApi';

import {
  BannerItem, BannersDto, BaseData, BaseDataDto,
} from './types';

export const mainPageApi = rtkApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getHomePageBaseData: build.query<BaseData, void>({
      query: () => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/main`,
      }),
      transformResponse: (response: BaseDataDto) => response.data,
    }),
    getHomePageBanners: build.query<BannerItem[], void>({
      query: () => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/banners`,
      }),
      transformResponse: (response: BannersDto) => response.data,
    }),
  }),
});

export const {
  endpoints: { getHomePageBanners, getHomePageBaseData },
  useGetHomePageBannersQuery,
  useGetHomePageBaseDataQuery,
} = mainPageApi;
