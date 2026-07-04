import { ImageType } from '@/shared/types/common';

export interface Category {
  id: string;
  title: string;
  url: string;
  is_null?: boolean;
  slug?: string;
  description?: string;
  picture?: ImageType | false;
  children?: Category[] | false;
  meta_title?: string;
  meta_description?: string;
  // eSputnik category name (= feed g:google_product_category segment); backend-provided, optional until shipped.
  esputnik_category_key?: string;
}
