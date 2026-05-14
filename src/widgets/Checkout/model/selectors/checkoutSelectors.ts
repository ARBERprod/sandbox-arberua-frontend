import { StoreSchema } from '@/shared/types/store';

const getCurrentTab = (state: StoreSchema) => state.checkout?.currentTab || 'new';

export const checkoutSelectors = {
  getCurrentTab,
};
