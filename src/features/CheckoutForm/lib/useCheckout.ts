import { isValidationError } from '@/shared/types/type-guards';
import { CheckoutFormData } from '../model/types/CheckoutFormData';
import { useCheckoutMutation, useGetDeliveryMethodsQuery, useGetPaymentMethodsQuery } from '../api/checkoutApi';
import { useDeleteCartMutation } from '@/entities/Cart';
import { prepareCheckoutData } from './prepareCheckoutData';
import { useMemo } from 'react';
import { checkoutOptionsMapper } from './checkoutOptionsMapper';
import { findDeliveryMethodByType } from './findDeliveryMethodByType';
import { isCheckoutResponseUrlDto } from '@/features/CheckoutForm/api/typeGuards';
import { routerPaths } from '@/shared/config/router';
import { useRouter } from 'next/router';
import { getCheckoutFormErrors } from './getCheckoutFormErrors';

export const useCheckout = () => {
  const { push } = useRouter();
  const { data: paymentMethodsOptions } = useGetPaymentMethodsQuery();
  const { data: deliveryMethods } = useGetDeliveryMethodsQuery();
  const [checkout] = useCheckoutMutation();
  const [deleteCart] = useDeleteCartMutation();

  const submitCheckoutForm = async (data: CheckoutFormData) => {
    try {
      const response = await checkout(
        prepareCheckoutData(data, deliveryMethods),
      ).unwrap();
      if (isCheckoutResponseUrlDto(response)) {
        await push(response.url);
      } else if (response.order) {
        await push(routerPaths.checkout_success(response.order));
      }
      await deleteCart().unwrap();
    } catch (e) {
      if (isValidationError(e)) {
        throw getCheckoutFormErrors(e);
      }
    }
  };

  const deliveryMethodsOptions = useMemo(() => {
    if (!deliveryMethods) return [];

    return deliveryMethods.map(checkoutOptionsMapper.mapDeliveryMethodToOptions);
  }, [deliveryMethods]);

  const getChosenDeliveryMethod = (methodId: string) => deliveryMethods?.find((method) => method.id === methodId);

  const getAddressDeliveryMethodId = () => findDeliveryMethodByType(deliveryMethods, 'address')?.id;

  return {
    submitCheckoutForm,
    getChosenDeliveryMethod,
    deliveryMethodsOptions,
    paymentMethodsOptions,
    getAddressDeliveryMethodId,
  };
};
