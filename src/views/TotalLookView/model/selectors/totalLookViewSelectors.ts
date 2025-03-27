import { StoreSchema } from '@/shared/types/store';
import { createSelector } from 'reselect';

const getChosenProducts = (state: StoreSchema) => state.totalLookView?.chosenProducts || [];
const getChosenSkus = (state: StoreSchema) => state.totalLookView?.chosenSkus || {};

const memoizedChosenSkus = createSelector(getChosenSkus, (skus) => skus);
const memoizedChosenProducts = createSelector(getChosenProducts, (products) => products);
const getTotalAmount = createSelector(
  getChosenProducts,
  memoizedChosenSkus,
  (products, skus) => products.reduce((acc, product) => {
    if (skus[product.id] === null) {
      return acc + product.price.value;
    }
    return acc + skus[product.id]!.price.value;
  }, 0),
);

export const getProductChosenSku = (
  productId: string,
) => (state: StoreSchema) => state.totalLookView?.chosenSkus[productId]
  || null;

export const totalLookViewSelectors = {
  getTotalAmount,
  getChosenProducts: memoizedChosenProducts,
  getChosenSkus: memoizedChosenSkus,
  getProductChosenSku,
};
