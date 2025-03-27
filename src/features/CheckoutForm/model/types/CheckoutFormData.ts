export interface CheckoutFormData {
  customer: {
    first_name: string;
    last_name: string;
    middle_name: string;
    phone: string;
    email: string;
  };
  city_id: string;
  payment_method_id: string;
  delivery_method_id: string;
  note: string;
  address: {
    street: string;
    house: string;
    flat: string;
  };
  warehouse_id: string;
  call_reject: boolean;
  privacy: boolean;
  email_subscribe: boolean;
}
