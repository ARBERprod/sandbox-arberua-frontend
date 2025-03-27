import { StoreSchema } from '@/shared/types/store';

const getActiveModal = (state: StoreSchema) => state.preorderProduct?.activeModal || null;
const getProductId = (state: StoreSchema) => state.preorderProduct?.productId || '';

export const preorderProductSelectors = {
  getActiveModal,
  getProductId,
};
