import { SuccessApiResponse } from '@/shared/types/api';

export interface MenuItem {
  slug: string;
  title: string;
  children: MenuItem[] | false;
}

export interface PageItem {
  title: string;
  url: string;
  slug: string;
}

export type MenusData = {
  menus: MenuItem[];
  pages: PageItem[];
}

export type MenusDto = SuccessApiResponse<MenusData>;
