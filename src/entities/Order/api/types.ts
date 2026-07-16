import { ImageType, Price } from '@/shared/types/common';
import { City } from '@/entities/Location';
import {
  OrderDeliveryMethod, OrderHistory, OrderPaymentMethod, OrderProductProperty,
} from '../model/types';

// The API sends `{id, title}`; `color` is a frontend-only decoration added by orderMapper.
export interface OrderStatusDto {
  id: string;
  title: string;
}

export interface OrderProductDto {
  id: string;
  old_price: Price | false;
  price: Price;
  picture: ImageType;
  quantity: number;
  title: string;
  url: string;
  // Named `options` by the backend (OrderItemResource); the domain model calls them `properties`.
  options: OrderProductProperty[];
  bonus_deduction: number;
  brand: string;
  category: string;
  variant: string;
  parent_id: string;
}

export type OrderTotalItem = {
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

// city / delivery_method / payment_method / status are nullOnDelete FKs on the backend `orders` table:
// removing a method, a city or a status in admin blanks it on every historical order, so old orders do arrive without them.
export interface OrderDto {
  id: string;
  city: City | null;
  cost: Price;
  created_at: string;
  delivery_method: OrderDeliveryMethod | null;
  products: OrderProductDto[];
  note: string;
  order_number: number;
  payment_method: OrderPaymentMethod | null;
  status: OrderStatusDto | null;
  histories?: OrderHistory[];
  address: OrderAddress | null
  totals: OrderTotalItem[];
  customer: OrderCustomer;
  deduct_bonus: number | null;
}
