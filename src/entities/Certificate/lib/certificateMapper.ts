import { Product } from '@/entities/Product';
import { Certificate } from '../model/types';

export const certificateMapper = (product: Product): Certificate => {
  const {
    id, title, url, price, pictures,
  } = product;
  return {
    id,
    title,
    href: url,
    image: pictures.length > 0 ? pictures[0] : null,
    price,
  };
};
