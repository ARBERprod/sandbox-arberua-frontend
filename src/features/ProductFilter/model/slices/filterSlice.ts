import { buildSlice } from '@/shared/lib/utils/buildSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { FilterValue, ProductFilterSchema } from '../types/ProductFilterSchema';

const initialState:ProductFilterSchema = {
  isOpen: false,
  initValues: {},
  values: {},
};

const filterSlice = buildSlice({
  name: 'productFilter',
  initialState,
  reducers: {
    setValue: (state, action:PayloadAction<{name: string, value: FilterValue}>) => {
      state.values[action.payload.name] = action.payload.value;
    },
    setValues: (state, action: PayloadAction<{[key: string]: FilterValue}>) => {
      state.values = action.payload;
    },
    resetFilters: (state) => {
      state.values = { ...state.initValues };
    },
    setOpen: (state, action:PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { useActions: useFilterActions, reducer: productFilterReducer } = filterSlice;
