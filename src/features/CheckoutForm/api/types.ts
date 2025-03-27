import { SuccessApiResponse } from '@/shared/types/api';

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

export type PaymentMethodsDto = SuccessApiResponse<PaymentMethod[]>;
export type DeliveryMethodsDto = SuccessApiResponse<DeliveryMethod[]>;
export type WarehousesDto = SuccessApiResponse<Warehouse[]>;
