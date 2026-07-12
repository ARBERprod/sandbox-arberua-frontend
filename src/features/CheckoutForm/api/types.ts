import { SuccessApiResponse } from '@/shared/types/api';
import { Shop } from '@/entities/Shop';

export interface PaymentMethod {
  id: string;
  title: string;
  description: string;
}

export interface Warehouse {
  id: string;
  title: string;
  index: string;
  latitude: string;
  longitude: string;
}

export type DeliveryMethodType = 'storage' | 'address';
export type DeliveryMethodCode = 'store' | 'new_post_courier' | 'new_post_pochtomat' | 'new_post';

// A cart item that cannot be picked up from ANY store (hard blocker).
export interface PickupBlockedItem {
  product_id: string;
  title: string;
  slug: string;
}

// GET /v2/checkout/pickup-points body (inside {success,data}). Keep this and the
// MSW mocks in lockstep. Invariant: stock_check_unavailable=true ⇒ the other
// fields stay empty.
export interface PickupPointsData {
  points: Shop[];
  unavailable_items: PickupBlockedItem[];
  no_common_store: boolean;
  stock_check_unavailable: boolean;
}

export interface DeliveryMethod {
  id: string;
  title: string;
  description: string | null;
  code: DeliveryMethodCode;
  type: DeliveryMethodType;
}

export type CheckoutDto = {
  customer: {
    first_name: string;
    last_name: string;
    middle_name: string;
    phone: string;
    email: string;
  };
  delivery_type: DeliveryMethodType;
  delivery_slug?: string;
  delivery_method_id: string;
  payment_method_id: string;
  city_id: string;
  note: string;
  new_post?: string;
  store_id?: string;
  do_not_call: 0 | 1;
  address?: {
    street: string;
    house: string;
    flat: string;
  };
};

export type CheckoutResponseUrlDto = {
  redirect: true;
  url: string;
};

export type CheckoutResponseIdDto = {
  redirect: false;
  order: string;
};

export type CheckoutResponseDto = CheckoutResponseUrlDto | CheckoutResponseIdDto;

export type WayForPayFormDto = SuccessApiResponse<string>;
export type LiqPayFormDto = SuccessApiResponse<string>;
export type XPayFormDto = SuccessApiResponse<string>;
export type PayPlaceFormDto = SuccessApiResponse<string>;

export type PaymentMethodsDto = SuccessApiResponse<PaymentMethod[]>;
export type DeliveryMethodsDto = SuccessApiResponse<DeliveryMethod[]>;
export type WarehousesDto = SuccessApiResponse<Warehouse[]>;
export type PickupPointsDto = SuccessApiResponse<PickupPointsData>;
