import { PayloadAction } from '@reduxjs/toolkit';
import { buildSlice } from '@/shared/lib/utils/buildSlice';
import { CheckoutSchema } from '../types/checkoutSchema';

const initialState:CheckoutSchema = {
  currentTab: 'new',
};

export const checkoutSlice = buildSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setTab: (state, action: PayloadAction<'new' | 'regular'>) => {
      state.currentTab = action.payload;
    },
  },

});

export const { reducer: checkoutReducer } = checkoutSlice;
export const { useActions: useCheckoutActions } = checkoutSlice;
