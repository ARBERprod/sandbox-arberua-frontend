import { buildSlice } from '@/shared/lib/utils/buildSlice';
import { AuthBySocialsSchema } from '../types/AuthBySocialsSchema';
import { PayloadAction } from '@reduxjs/toolkit';
import { GoogleAuthData } from '../../lib/GoogleAuthData';

const initialState: AuthBySocialsSchema = {
  google: {
    isModalOpen: false,
    data: null,
  },
};

const authBySocialsSlice = buildSlice({
  name: 'authBySocialsSlice',
  initialState,
  reducers: {
    openGoogleModal: (state, action: PayloadAction<GoogleAuthData>) => {
      state.google.isModalOpen = true;
      state.google.data = action.payload;
    },
    closeGoogleModal: (state) => {
      state.google.isModalOpen = false;
      state.google.data = null;
    },
  },
});

export const { reducer: authBySocialsReducer, useActions: useAuthBySocialsActions } = authBySocialsSlice;
