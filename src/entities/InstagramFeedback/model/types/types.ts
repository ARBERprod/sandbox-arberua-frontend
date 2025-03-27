import { ImageType } from '@/shared/types/common';
import { Product } from '@/entities/Product';

export type Instagram = {
  id: string;
  created_at: string;
  picture: ImageType;
  instagram: {
    id: string;
    url: string
  };
  products: Product[]
}
