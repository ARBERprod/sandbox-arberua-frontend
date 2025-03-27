import { StoreSchema } from '@/shared/types/store';

const getCurrentModal = (state: StoreSchema) => state.editConsultation?.currentModal || null;
const getIsModalVisible = (state: StoreSchema) => state.editConsultation?.isModalVisible ?? true;
const getConsultation = (state: StoreSchema) => state.editConsultation?.consultation || null;

export const editConsultationSelectors = {
  getCurrentModal,
  getIsModalVisible,
  getConsultation,
};
