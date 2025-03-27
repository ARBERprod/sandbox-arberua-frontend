import { StoreSchema } from '@/shared/types/store';

const getIsSettingsModalOpen = (state: StoreSchema) => state.siteSettings?.isSettingsModalOpen || false;

export const siteSettingsSelectors = {
  getIsSettingsModalOpen,
};
