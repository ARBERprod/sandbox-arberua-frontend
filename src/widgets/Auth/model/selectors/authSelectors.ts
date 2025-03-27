import { StoreSchema } from '@/shared/types/store';

const getActiveModal = (state: StoreSchema) => state.auth?.activeModal || null;
const getUserLogin = (state: StoreSchema) => state.auth?.login || '';

export const authSelectors = {
  getActiveModal,
  getUserLogin,
};
