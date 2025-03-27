import { StoreSchema } from '@/shared/types/store';

const getCurrentModal = (state: StoreSchema) => state.signUpForConsultation?.currentModal || null;
const getIsModalVisible = (state: StoreSchema) => state.signUpForConsultation?.isModalVisible ?? true;
const getFormat = (state: StoreSchema) => state.signUpForConsultation?.format || 'online';
const getConsultantId = (state: StoreSchema) => state.signUpForConsultation?.consultantId || '';
const getConsultants = (state: StoreSchema) => state.signUpForConsultation?.consultants || [];
const getShopId = (state: StoreSchema) => state.signUpForConsultation?.shopId || '';
const getIsConsultantBlocked = (state: StoreSchema) => state.signUpForConsultation?.isConsultantBlocked || false;

export const signUpForConsultationSelectors = {
  getCurrentModal,
  getIsModalVisible,
  getFormat,
  getConsultantId,
  getConsultants,
  getShopId,
  getIsConsultantBlocked,
};
