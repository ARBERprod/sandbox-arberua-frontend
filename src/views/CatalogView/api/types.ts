import { SuccessApiResponseWithMeta } from '@/shared/types/api';
import { Category } from '@/entities/Category';
import { Product } from '@/entities/Product';
import { FilterItem } from '@/entities/Filter';
import { Breadcrumb } from '@/shared/ui/Breadcrumps';
import { SortOption } from '@/shared/types/common';

export type CatalogData = {
  category: Category;
  children: Category[];
  breadcrumbs: Breadcrumb[];
  filters: FilterItem[];
  products: Product[];
  sorter: SortOption[];
}

export type CatalogDto = SuccessApiResponseWithMeta<CatalogData>;
