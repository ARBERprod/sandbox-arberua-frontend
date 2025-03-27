import { buildSlice } from '@/shared/lib/utils/buildSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { Faq } from '../types/types';
import { FaqViewSchema } from '../types/faqViewSchema';

const initialState: FaqViewSchema = {
  currentTab: null,
  currentQuestions: null,
};

export const faqViewSlice = buildSlice({
  name: 'faqView',
  initialState,
  reducers: {
    setCurrentTab: (state, action: PayloadAction<string>) => {
      state.currentTab = action.payload;
    },
    setCurrentQuestions: (state, action: PayloadAction<Faq[]>) => {
      state.currentQuestions = action.payload;
    },
  },
});

export const {
  useActions: useFaqViewActions,
  reducer: faqViewReducer,
} = faqViewSlice;
