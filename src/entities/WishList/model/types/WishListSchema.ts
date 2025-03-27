import { Product } from '@/entities/Product';

export interface WishListSchema {
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  products: Product[];
}
