import { StoreSchema } from '@/shared/types/store';

const getGlobalView = (state: StoreSchema) => state.ui.view;

export const UISelectors = {
  getGlobalView,
};
