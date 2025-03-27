import { ProductQuantity } from '@/entities/Product';

export const getFoundStoresCount = (
  quantities: ProductQuantity[],
) => quantities.reduce((acc, quantity) => acc + quantity.stores.length, 0);
