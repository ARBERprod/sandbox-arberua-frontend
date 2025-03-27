import { CartData } from './types';

export interface CartSchema {
  isOpen: boolean;
  cartData: CartData | null;
  isFetching: boolean;
  isLoading: boolean;
  isError: boolean;
}
