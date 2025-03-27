import { StoreSchema } from '@/shared/types/store';

const getIsModalOpen = (state:StoreSchema) => state.search?.isModalOpen || false;

const getIsSearchOpen = (state:StoreSchema) => state.search?.isSearchOpen || false;

const getSearchFieldValue = (state:StoreSchema) => state.search?.searchFieldValue || '';

export const searchSelectors = {
  getIsModalOpen,
  getIsSearchOpen,
  getSearchFieldValue,
};
