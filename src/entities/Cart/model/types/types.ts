import { ImageType, Price } from '@/shared/types/common';

export type CartItemOption = {
  title: string;
  value: string;
};

export interface ICartItem {
  id: string;
  owner_id: string;
  quantity: number;
  cost: Price;
  price: Price;
  old_price: Price | false;
  picture: ImageType;
  title: string;
  url: string;
  options: CartItemOption[];
  category: string;
  brand: string;
  variant: string;
  parent_id: string;
}

export interface CartHistoryItem {
  title: string;
  price: Price;
}

export interface CartData {
  totals: CartHistoryItem[];
  items: ICartItem[];
  total: number;
  quantity: number;
}
