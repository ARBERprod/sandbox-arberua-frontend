import { StoreSchema } from '@/shared/types/store';

const getIsOpen = (state:StoreSchema) => state.productSort?.isOpen || false;

export const productSortSelectors = {
  getIsOpen,
};
