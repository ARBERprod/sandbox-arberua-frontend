import { buildSlice } from '@/shared/lib/utils/buildSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { Shop } from '@/entities/Shop';
import { ProductAvailabilityModal, ProductAvailabilitySchema } from './productAvailabilitySchema';

const initialState:ProductAvailabilitySchema = {
  activeModal: null,
  productId: null,
  activeMobileAvailabilityView: 'list',
  activeCityId: 'all',
  activeShop: null,
};

const productAvailabilitySlice = buildSlice({
  name: 'productAvailability',
  initialState,
  reducers: {
    openModal: (state, action:PayloadAction<{productId: string, type: ProductAvailabilityModal}>) => {
      state.activeModal = action.payload.type;
      state.productId = action.payload.productId;
    },
    closeModal: (state) => {
      state.activeModal = null;
      state.productId = null;
      state.activeMobileAvailabilityView = 'list';
      state.activeCityId = 'all';
      state.activeShop = null;
    },
    setActiveModal: (state, action:PayloadAction<{type: ProductAvailabilityModal}>) => {
      state.activeModal = action.payload.type;
    },
    setActiveView: (state, action: PayloadAction<'list' | 'map'>) => {
      state.activeMobileAvailabilityView = action.payload;
    },
    setActiveShop: (state, action: PayloadAction<Shop | null>) => {
      state.activeShop = action.payload;
    },
    setActiveCityId: (state, action: PayloadAction<string>) => {
      state.activeCityId = action.payload;
    },
  },
});

export const {
  reducer: productAvailabilityReducer,
  useActions: useProductAvailabilityActions,
} = productAvailabilitySlice;
