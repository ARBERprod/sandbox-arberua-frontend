import { StoreSchema } from '@/shared/types/store';

const getCurrentTab = (state: StoreSchema) => state.checkout?.currentTab || 'new';
const getPromoCode = (state: StoreSchema) => state.checkout?.promoCode || '';

export const checkoutSelectors = {
  getCurrentTab,
  getPromoCode,
};
