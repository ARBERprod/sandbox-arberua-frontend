import { PayloadAction } from '@reduxjs/toolkit';
import { buildSlice } from '@/shared/lib/utils/buildSlice';
import { RecoverPasswordModalType, RecoverPasswordSchema } from '../types/recoverPasswordSchema';

const initialState:RecoverPasswordSchema = {
  activeModal: null,
  email: '',
};

export const recoverPasswordSlice = buildSlice({
  name: 'recoverPassword',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{type: RecoverPasswordModalType}>) => {
      state.activeModal = action.payload.type;
    },
    setEmail: (state, action:PayloadAction<string>) => {
      state.email = action.payload;
    },
    closeModal: (state) => {
      state.activeModal = null;
      state.email = '';
    },
  },

});

export const { reducer: recoverPasswordReducer } = recoverPasswordSlice;
export const { useActions: useRecoverPasswordActions } = recoverPasswordSlice;
