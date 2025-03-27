import { buildSlice } from '@/shared/lib/utils/buildSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { AuthModalType, AuthSchema } from '../types/AuthSchema';

const initialState:AuthSchema = {
  activeModal: null,
  login: '',
};

const authSlice = buildSlice({
  name: 'auth',
  initialState,
  reducers: {
    setActiveModal: (state, action: PayloadAction<AuthModalType | null>) => {
      state.activeModal = action.payload;
    },
    openLoginModal: (state) => {
      state.activeModal = AuthModalType.LOGIN_USERNAME;
    },
    openRegisterModal: (state) => {
      state.activeModal = AuthModalType.REGISTER;
    },
    closeModal: (state) => {
      state.activeModal = null;
      state.login = '';
    },
    setLogin: (state, action: PayloadAction<string>) => {
      state.login = action.payload;
    },
  },
});

export const { reducer: authReducer, useActions: useAuthActions, actions: authActions } = authSlice;
