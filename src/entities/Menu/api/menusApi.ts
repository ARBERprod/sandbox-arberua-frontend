import { rtkApi } from '@/shared/api/rtkApi';
import { MenusDto, MenusData } from './types';

export const menusApi = rtkApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getMenus: build.query<MenusData, void>({
      query: () => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/menus`,
      }),
      transformResponse: (response: MenusDto) => response.data,
    }),
  }),
});

export const { useGetMenusQuery, endpoints: { getMenus } } = menusApi;
