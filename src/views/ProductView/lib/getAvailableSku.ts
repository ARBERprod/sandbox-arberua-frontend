import { ProductSku } from '@/entities/Product';

export const getAvailableSku = (product: {skus: ProductSku[] | null}): ProductSku | null => {
  if (!product.skus || product.skus.length === 0) return null;
  const availableSku = product.skus.find((sku) => sku.is_sale);
  return availableSku || null;
};
