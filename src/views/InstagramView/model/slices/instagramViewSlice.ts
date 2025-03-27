import { buildSlice } from '@/shared/lib/utils/buildSlice';
import { CardView } from '@/shared/types/common';
import { PayloadAction } from '@reduxjs/toolkit';
import { InstagramViewSchema } from '../types/instagramViewSchema';

const initialState:InstagramViewSchema = {
  view: CardView.BIG,
};

export const instagramViewSlice = buildSlice({
  name: 'instagramView',
  initialState,
  reducers: {
    setView: (state, action:PayloadAction<CardView>) => {
      state.view = action.payload;
    },
  },

});

export const {
  useActions: useInstagramViewActions,
  reducer: instagramViewReducer,
} = instagramViewSlice;
