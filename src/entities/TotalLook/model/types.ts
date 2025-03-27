import { ImageType } from '@/shared/types/common';
import { SmallProduct } from '@/entities/Product';

export interface TotalLook {
  id: string;
  title: string;
  picture: ImageType;
  products_count: string;
  product_ids: string[];
  url: string;
}

export interface DetailedTotalLook {
  id: string;
  title: string;
  products_count: number;
  url: string;
  picture: ImageType;
  products: SmallProduct[];
}
