import { getDeliveryMethodById } from './getDeliveryMethodById';
import { CheckoutFormData } from '../model/types/CheckoutFormData';
import { CheckoutDto, DeliveryMethod } from '../api/types';

const isAddressDeliveryMethod = (
  deliveryMethod: DeliveryMethod,
) => deliveryMethod.type === 'address';

export const prepareCheckoutData = (
  formData: CheckoutFormData,
  deliveryMethods?: DeliveryMethod[],
): CheckoutDto => {
  const deliveryMethod = getDeliveryMethodById(deliveryMethods, formData.delivery_method_id)!;
  const result: CheckoutDto = {
    city_id: formData.city_id,
    delivery_method_id: formData.delivery_method_id,
    payment_method_id: formData.payment_method_id,
    note: formData.note,
    customer: formData.customer,
    do_not_call: formData.call_reject ? 1 : 0,
    delivery_type: deliveryMethod.type,
  };

  if (deliveryMethod.type === 'storage') {
    result.delivery_slug = deliveryMethod.code;
    if (deliveryMethod.code === 'store') {
      result.store_id = formData.warehouse_id;
    } else {
      result.new_post = formData.warehouse_id;
    }
  }

  if (isAddressDeliveryMethod(deliveryMethod)) {
    result.address = {
      flat: formData.address.flat,
      house: formData.address.house,
      street: formData.address.street,
    };
  }

  return result;
};
