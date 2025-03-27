import { ImageType, Price } from '@/shared/types/common';
import { City } from '@/entities/Location';
import {
  OrderDeliveryMethod, OrderHistory, OrderPaymentMethod, OrderProductProperty,
  OrderStatus,
} from '../model/types';

export interface OrderProductDto {
  id: string;
  old_price: Price | false;
  price: Price;
  picture: ImageType;
  quantity: number;
  title: string;
  url: string;
  wishlist_count: number;
  properties: OrderProductProperty[];
  bonus_deduction: number;
  brand: string;
  category: string;
  variant: string;
  parent_id: string;
}

export type OrderTotalItem = {
  id: string;
  title: string;
  value: number;
};
export type OrderCustomer = {
  email: string;
  first_name: string;
  id: string;
  last_name: string;
  middle_name: string;
  phone: string;
};

export type OrderAddress = {
  id: string;
  street: string;
  house: string;
  flat: string;
}

export interface OrderDto {
  id: string;
  city: City;
  cost: Price;
  created_at: string;
  delivery_method: OrderDeliveryMethod;
  do_not_call: boolean;
  products: OrderProductDto[];
  note: string;
  order_number: number;
  payment_method: OrderPaymentMethod;
  status: OrderStatus;
  histories?: OrderHistory[];
  address: OrderAddress | null
  totals: OrderTotalItem[];
  customer: OrderCustomer;
  count: number;
  total_price: Price | false;
  deduct_bonus: number | null;
}
