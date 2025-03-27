import { StoreSchema } from '@/shared/types/store';

const getIsModalOpen = (state: StoreSchema) => state.officeOrders?.isModalOpen || false;
const getOrder = (state: StoreSchema) => state.officeOrders?.chosenOrder || null;

export const officeOrdersSelectors = {
  getIsModalOpen,
  getOrder,
};
