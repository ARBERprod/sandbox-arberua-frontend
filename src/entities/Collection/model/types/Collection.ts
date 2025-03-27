import { Product } from '@/entities/Product';

export interface Collection {
  id: string;
  title: string;
  picture: string;
  url: string;
  products: Product[];
}
