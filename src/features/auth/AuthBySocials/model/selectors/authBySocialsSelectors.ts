import { StoreSchema } from '@/shared/types/store';
import { GoogleAuthData } from '../../lib/GoogleAuthData';

const getGoogleModalData = (state: StoreSchema) => state.authBySocialsSchema?.google.data || new GoogleAuthData();
const getIsGoogleModalOpen = (state: StoreSchema) => state.authBySocialsSchema?.google.isModalOpen || false;

export const authBySocialsSelectors = {
  getGoogleModalData,
  getIsGoogleModalOpen,
};
