import { DeliveryMethod, DeliveryMethodType } from '../api/types';

export const findDeliveryMethodByType = (
  deliveryMethods: DeliveryMethod[] | undefined,
  type: DeliveryMethodType,
): DeliveryMethod | undefined => deliveryMethods?.find((method) => method.type === type);
