import { DeliveryMethod } from '../api/types';

export const getDeliveryMethodById = (
  deliveryMethods: DeliveryMethod[] | undefined,
  methodId: string,
) => deliveryMethods?.find((method) => method.id === methodId);
