import { ImageType, Price } from '@/shared/types/common';
import { OrderAddress, OrderCustomer, OrderTotalItem } from '../api/types';
import { City } from '@/entities/Location';

export interface OrderStatus {
  title: string;
}

export type OrderProductProperty = {
  property: string;
  value: string;
}

export interface OrderProduct {
  id: string;
  title: string;
  picture: ImageType;
  url: string;
  price?: Price;
  quantity?: number;
  properties?: OrderProductProperty[];
  bonus_deduction?: number;
}

export type OrderHistory = {
  id: string;
  title: string | null;
  created_at: string;
};

export interface Order {
  id: string;
  order_number: number;
  cost: Price;
  note: string | null;
  status: OrderStatus | null;
  date: string;
  count: number;
  total_price: Price | false;
  delivery_method: string | null;
  payment_method: string | null;
  products: OrderProduct[];
  histories?: OrderHistory[];
  deduct_bonus: number | null;
  city: City | null;
  address: OrderAddress | null
  totals: OrderTotalItem[];
  customer: OrderCustomer;
}

export interface OrderDeliveryMethod {
  id: string;
  title: string;
}

export interface OrderPaymentMethod {
  id: string;
  title: string;
}
