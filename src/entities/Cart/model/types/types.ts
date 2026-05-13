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
  promocode_discount: number | null;
}

export interface CartHistoryItem {
  title: string;
  price: Price;
}

export interface PromocodeMeta {
  code: string;
  discount: number;
  period_to: string | null;
  total_discount: number;
}

export interface CartData {
  totals: CartHistoryItem[];
  items: ICartItem[];
  total: number;
  quantity: number;
  promocode: PromocodeMeta | null;
}
