import { ProductSku } from '../model/types';
import { Price } from '@/shared/types/common';

export const getItemPrices = (product: {price: Price; old_price: Price | false}, sku: ProductSku | null): {
  price: Price;
  oldPrice: Price | false
} => {
  const price = sku ? sku.price : product.price;
  const oldPrice = sku?.old_price ? sku.old_price : product.old_price;
  return {
    price,
    oldPrice,
  };
};
