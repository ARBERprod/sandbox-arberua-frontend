import { buildSlice } from '@/shared/lib/utils/buildSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { Order } from '@/entities/Order';
import { OfficeOrderSchema } from '../types/OfficeOrderSchema';

const initialState:OfficeOrderSchema = {
  isModalOpen: false,
  chosenOrder: null,
};

const officeOrdersSlice = buildSlice({
  name: 'officeOrders',
  initialState,
  reducers: {
    openModal: (state, action:PayloadAction<{order: Order}>) => {
      state.isModalOpen = true;
      state.chosenOrder = action.payload.order;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.chosenOrder = null;
    },
  },
});

export const { reducer: officeOrdersReducer, useActions: useOfficeOrdersActions } = officeOrdersSlice;
