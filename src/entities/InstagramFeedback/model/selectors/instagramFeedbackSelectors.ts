import { StoreSchema } from '@/shared/types/store';

const getIsModalOpen = (state:StoreSchema) => state.instagramFeedback?.isModalOpen || false;
const getInstagram = (state:StoreSchema) => state.instagramFeedback?.instagram;

export const instagramFeedbackSelectors = {
  getIsModalOpen,
  getInstagram,
};
