import { StoreSchema } from '@/shared/types/store';

const getEmail = (state:StoreSchema) => state.recoverPassword?.email || '';
const getActiveModal = (state:StoreSchema) => state.recoverPassword?.activeModal || null;

export const recoverPasswordSelectors = {
  getEmail,
  getActiveModal,
};
