import { PayloadAction } from '@reduxjs/toolkit';
import { buildSlice } from '@/shared/lib/utils/buildSlice';
import { InstagramFeedbackSchema } from '../types/InstagramFeedbackSchema';
import { Instagram } from '../types/types';

const initialState:InstagramFeedbackSchema = {
  isModalOpen: false,
  instagram: null,
};

export const instagramFeedbackSlice = buildSlice({
  name: 'instagramFeedback',
  initialState,
  reducers: {
    closeModal: (state) => {
      state.isModalOpen = false;
      state.instagram = null;
    },
    openModal: (state, action: PayloadAction<Instagram>) => {
      state.isModalOpen = true;
      state.instagram = action.payload;
    },
  },
});

export const {
  reducer: instagramFeedbackReducer,
  useActions: useInstagramFeedbackActions,
} = instagramFeedbackSlice;
