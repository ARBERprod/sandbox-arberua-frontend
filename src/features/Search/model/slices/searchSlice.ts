import { buildSlice } from '@/shared/lib/utils/buildSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { SearchSchema } from '../types/SearchSchema';

const initialState: SearchSchema = {
  isModalOpen: false,
  isSearchOpen: false,
  searchFieldValue: '',
};

export const searchSlice = buildSlice({
  name: 'search',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
    openSearch: (state) => {
      state.isSearchOpen = true;
    },
    closeSearch: (state) => {
      state.isSearchOpen = false;
    },
    setSearchFieldValue: (state, action: PayloadAction<string>) => {
      state.searchFieldValue = action.payload;
    },
  },
});

export const {
  reducer: searchReducer,
  useActions: useSearchActions,
} = searchSlice;
