import { StoreSchema } from '@/shared/types/store';

const getFilterValue = (name: string) => (state:StoreSchema) => state.productFilter?.values[name];
const getFilterValues = (state: StoreSchema) => state.productFilter?.values || {};
const getIsOpen = (state:StoreSchema) => state.productFilter?.isOpen || false;

export const productFilterSelectors = {
  getFilterValue,
  getFilterValues,
  getIsOpen,
};
