import { StoreSchema } from '@/shared/types/store';

const getIsModalOpen = (state: StoreSchema) => state?.editPersonalData?.isModalOpen || false;
const getActiveEditPersonalDataFormView = (state: StoreSchema) => state
  ?.editPersonalData
  ?.activeEditPersonalDataFormView || null;

export const editPersonalDataSelectors = {
  getIsModalOpen,
  getActiveEditPersonalDataFormView,
};
