import { StoreSchema } from '@/shared/types/store';
import { ProductAvailabilityModal } from './productAvailabilitySchema';

const getProductId = (state: StoreSchema) => state.productAvailability?.productId || '';
const getActiveModal = (state: StoreSchema) => state.productAvailability?.activeModal || null;
const getActiveShop = (state: StoreSchema) => state.productAvailability?.activeShop || null;
const getActiveCityId = (state: StoreSchema) => state.productAvailability?.activeCityId || 'all';
const getActiveAvailabilityView = (state: StoreSchema) => state.productAvailability?.activeMobileAvailabilityView || 'list';
const getIsModalOpenByType = (
  type: ProductAvailabilityModal,
) => (state: StoreSchema) => state.productAvailability?.activeModal === type;

export const productAvailabilitySelectors = {
  getProductId,
  getActiveModal,
  getIsModalOpenByType,
  getActiveAvailabilityView,
  getActiveShop,
  getActiveCityId,
};
