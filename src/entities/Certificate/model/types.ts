import { ImageType, Price } from '@/shared/types/common';

export interface Certificate {
  id: string;
  title: string;
  href: string;
  image?: ImageType;
  price: Price;
}
