import { AnyAction, PayloadAction } from '@reduxjs/toolkit';
import { buildSlice } from '@/shared/lib/utils/buildSlice';
import { CardView } from '@/shared/types/common';
import { HYDRATE } from 'next-redux-wrapper';
import { UISchema } from '../types/uISchema';

const initialState:UISchema = {
  view: CardView.NORMAL,
};

export const UISlice = buildSlice({
  name: 'ui',
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<CardView>) => {
      state.view = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: AnyAction) => {
      state.view = action.payload.ui.view;
    });
  },
});

export const { reducer: UIReducer } = UISlice;
export const { useActions: useUIActions } = UISlice;
export const { actions: UIActions } = UISlice;
