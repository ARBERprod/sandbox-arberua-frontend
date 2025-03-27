import { CheckoutFormData } from '../model/types/CheckoutFormData';

export const defaultData: CheckoutFormData = {
  customer: {
    first_name: '',
    last_name: '',
    middle_name: '',
    phone: '',
    email: '',
  },
  city_id: '',
  note: '',
  delivery_method_id: '',
  payment_method_id: '',
  privacy: false,
  call_reject: false,
  email_subscribe: true,
  warehouse_id: '',
  address: {
    street: '',
    house: '',
    flat: '',
  },
};
