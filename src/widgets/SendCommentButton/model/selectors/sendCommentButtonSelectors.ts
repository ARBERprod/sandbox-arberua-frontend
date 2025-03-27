import { StoreSchema } from '@/shared/types/store';

const getActiveModal = (state: StoreSchema) => state.sendComment?.activeModal || null;
const getReceiver = (state: StoreSchema) => state.sendComment?.receiver || 'product';
const getId = (state: StoreSchema) => state.sendComment?.entityId || null;
const getIsCommentModalActive = (state: StoreSchema) => state.sendComment?.activeModal === 'feedback' || false;
const getIsSuccessModalActive = (state: StoreSchema) => state.sendComment?.activeModal === 'success' || false;
const getIsWarningModalActive = (state: StoreSchema) => state.sendComment?.activeModal === 'warning' || false;

export const sendCommentSelectors = {
  getActiveModal,
  getReceiver,
  getIsCommentModalActive,
  getIsSuccessModalActive,
  getIsWarningModalActive,
  getId,
};
