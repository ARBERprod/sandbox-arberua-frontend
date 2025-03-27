import { Product, SmallProduct } from '../model/types';

export const getProductIds = (products: (Product[] | SmallProduct[])) => products.map((p) => p.id);
