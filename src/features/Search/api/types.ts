import { SuccessApiResponseWithMeta } from '@/shared/types/api';
import { SmallProduct } from '@/entities/Product';
import { Category } from '@/entities/Category';

export type SearchData = {
  products: SmallProduct[];
  categories: Pick<Category, 'title' | 'url' | 'id'>[];
}

export type SearchDto = SuccessApiResponseWithMeta<SearchData>;
