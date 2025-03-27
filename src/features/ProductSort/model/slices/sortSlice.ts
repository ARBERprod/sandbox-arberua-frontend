import { buildSlice } from '@/shared/lib/utils/buildSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { ProductSortSchema } from '../types/ProductSortSchema';

const initialState:ProductSortSchema = {
  isOpen: false,
};

const sortSlice = buildSlice({
  name: 'productSort',
  initialState,
  reducers: {
    setOpen: (state, action:PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { useActions: useSortActions, reducer: productSortReducer } = sortSlice;
