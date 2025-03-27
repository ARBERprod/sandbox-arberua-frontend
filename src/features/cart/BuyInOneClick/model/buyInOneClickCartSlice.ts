import { PayloadAction } from '@reduxjs/toolkit';
import { buildSlice } from '@/shared/lib/utils/buildSlice';
import { BuyInOneClickCartSchema } from './buyInOneClickCartSchema';
import { ICartItem } from '@/entities/Cart';

const initialState:BuyInOneClickCartSchema = {
  cartItems: [],
  showSuccessModal: false,
  isOpen: false,
};

export const buyInOneClickCartSlice = buildSlice({
  name: 'buyInOneClickCart',
  initialState,
  reducers: {
    closeCart: (state) => {
      state.isOpen = false;
      state.cartItems = [];
    },
    openCart: (state) => {
      state.isOpen = true;
    },
    showSuccessModal: (state) => {
      state.showSuccessModal = true;
    },
    closeSuccessModal: (state) => {
      state.showSuccessModal = false;
    },
    setCartItems: (state, action: PayloadAction<ICartItem[]>) => {
      state.cartItems = action.payload;
    },
    updateItemQuantity: (state, action: PayloadAction<{ itemId: string, quantity: number }>) => {
      const { itemId } = action.payload;
      const item = state.cartItems.find((item) => item.id === itemId);
      if (!item) return;
      if (action.payload.quantity === 0) {
        state.cartItems = state.cartItems.filter((i) => i.id !== itemId);
        return;
      }
      state.cartItems = state.cartItems.map((i) => (i.id === itemId ? {
        ...item,
        quantity: action.payload.quantity,
      } : i));
    },
    removeItem: (state, action: PayloadAction<{itemId: string}>) => {
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload.itemId);
    },
    clearCartItems: (state) => {
      state.cartItems = [];
    },
  },
});

export const { reducer: buyInOneClickCartReducer } = buyInOneClickCartSlice;
export const { useActions: useBuyInOneClickCartActions } = buyInOneClickCartSlice;
