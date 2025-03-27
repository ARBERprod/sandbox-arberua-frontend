import { StoreSchema } from '@/shared/types/store';

const getSuccessModalOpen = (state: StoreSchema) => state.buyInOneClick.showSuccessModal || false;
const getIsOpen = (state: StoreSchema) => state.buyInOneClick.isOpen || false;
const getCartItems = (state: StoreSchema) => state.buyInOneClick.cartItems || [];

export const buyInOneClickCartSelectors = {
  getSuccessModalOpen,
  getIsOpen,
  getCartItems,
};
