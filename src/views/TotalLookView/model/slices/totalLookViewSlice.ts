import { buildSlice } from '@/shared/lib/utils/buildSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { ProductSku, SmallProduct } from '@/entities/Product';
import { TotalLookViewSchema } from '../types/totalLookViewSchema';

const initialState: TotalLookViewSchema = {
  chosenProducts: [],
  chosenSkus: {},
};

const totalLookViewSlice = buildSlice({
  name: 'totalLookView',
  initialState,
  reducers: {
    setProducts: (state, action:PayloadAction<SmallProduct[]>) => {
      state.chosenProducts = action.payload;
    },
    appendProduct: (state, action:PayloadAction<SmallProduct>) => {
      if (!state.chosenProducts.find((p) => p.id === action.payload.id)) {
        state.chosenProducts.push(action.payload);
      }
    },
    removeProduct: (state, action:PayloadAction<SmallProduct>) => {
      state.chosenProducts = state.chosenProducts.filter((p) => p.id !== action.payload.id);
    },
    clearProducts: (state) => {
      state.chosenProducts = [];
    },
    selectSku: (state, action: PayloadAction<{productId: string; sku: ProductSku | null}>) => {
      state.chosenSkus[action.payload.productId] = action.payload.sku;
    },
  },
});

export const { reducer: totalLookViewReducer, useActions: useTotalLookViewActions } = totalLookViewSlice;
