import { SuccessApiResponseWithMeta } from '@/shared/types/api';
import { Product } from '@/entities/Product';
import { FilterItem } from '@/entities/Filter/model/types';
import { SortOption } from '@/shared/types/common';

export type SearchedProductsDto = SuccessApiResponseWithMeta<{
  markup: {title: string};
  filters: FilterItem[];
  products: Product[];
  sorter: SortOption[];
}>

export type SearchedProductsOptions = {
  query: string;
  page?: number;
  filters?: string;
  sort?: string;
}
