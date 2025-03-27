import { StoreSchema } from '@/shared/types/store';

const getIsModalOpen = (state:StoreSchema) => state.callback?.isModalOpen || false;

export const callbackSelectors = {
  getIsModalOpen,
};
