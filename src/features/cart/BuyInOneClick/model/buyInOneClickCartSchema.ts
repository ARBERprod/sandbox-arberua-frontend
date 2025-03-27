import { ICartItem } from '@/entities/Cart';

export interface BuyInOneClickCartSchema {
  cartItems: ICartItem[];
  showSuccessModal: boolean;
  isOpen: boolean;
}
