import { buildSlice } from '@/shared/lib/utils/buildSlice';
import { PreorderProductSchema } from './preorderProductSchema';
import { PayloadAction } from '@reduxjs/toolkit';

const initialState:PreorderProductSchema = {
  activeModal: null,
  productId: '',
};

export const preorderProductSlice = buildSlice({
  name: 'preorderProduct',
  initialState,
  reducers: {
    setProductId: (state, action:PayloadAction<string>) => {
      state.productId = action.payload;
    },
    openModal: (state) => {
      state.activeModal = 'form';
    },
    closeModal: (state) => {
      state.activeModal = null;
      state.productId = '';
    },
    showSuccessModal: (state) => {
      state.activeModal = 'success';
    },
  },
});

export const { reducer: preorderProductReducer } = preorderProductSlice;
export const { useActions: usePreorderProductActions } = preorderProductSlice;
