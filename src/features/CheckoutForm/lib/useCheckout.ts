import i18next from 'i18next';
import { isBusinessError, isValidationError } from '@/shared/types/type-guards';
import { CheckoutFormData } from '../model/types/CheckoutFormData';
import { useCheckoutMutation, useGetDeliveryMethodsQuery, useGetPaymentMethodsQuery } from '../api/checkoutApi';
import { getPromocodeErrorKey, isPromocodeCheckoutRaceCode, useDeleteCartMutation } from '@/entities/Cart';
import { prepareCheckoutData } from './prepareCheckoutData';
import { useMemo } from 'react';
import { checkoutOptionsMapper } from './checkoutOptionsMapper';
import { findDeliveryMethodByType } from './findDeliveryMethodByType';
import { isCheckoutResponseUrlDto } from '@/features/CheckoutForm/api/typeGuards';
import { routerPaths } from '@/shared/config/router';
import { useRouter } from 'next/router';
import { getCheckoutFormErrors } from './getCheckoutFormErrors';
import { refetchSession } from '@/entities/Session';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { getNotify } from '@/shared/ui/Notification';
import { snapshotPurchaseGuid } from '@/shared/lib/analytics/esputnikCartGuid';

export const useCheckout = () => {
  const { push } = useRouter();
  const dispatch = useAppDispatch();
  const { data: paymentMethodsOptions } = useGetPaymentMethodsQuery();
  const { data: deliveryMethods } = useGetDeliveryMethodsQuery();
  const [checkout] = useCheckoutMutation();
  const [deleteCart] = useDeleteCartMutation();

  const submitCheckoutForm = async (data: CheckoutFormData) => {
    let response;
    try {
      response = await checkout(
        prepareCheckoutData(data, deliveryMethods),
      ).unwrap();
    } catch (e) {
      if (isBusinessError(e) && isPromocodeCheckoutRaceCode(e.data.error.code)) {
        // Race between devices: promocode invalidated server-side after the
        // cart was rendered. Show a locale-specific message (backend message
        // as fallback) and pull a fresh cart so the user sees corrected totals
        // before re-submitting.
        const { code, message } = e.data.error;
        getNotify({
          type: 'error',
          content: i18next.t(getPromocodeErrorKey(code), { defaultValue: message }),
        }).notify();
        try {
          await dispatch(refetchSession()).unwrap();
        } catch {
          // Best-effort refresh; cart state remains stale but the user is
          // already informed via the toast above.
        }
        // Re-throw so the consuming form treats the submit as failed (keeps
        // isSubmitting=false, no fake success, no navigation).
        throw e;
      }
      if (isValidationError(e)) {
        throw getCheckoutFormErrors(e);
      }
      // Anything else (network, 5xx, unknown business code) — surface to the
      // form so the user sees an error state instead of a silent no-op.
      throw e;
    }

    // Capture the live cart GUID before any navigation (WayForPay redirects to an
    // external URL, after which this effect may not finish) and before the post-order
    // cart-clear can rotate it, so the success-page PurchasedItems binds to the
    // pre-clear basket (GUID protocol). Single canonical snapshot point for both routes.
    snapshotPurchaseGuid();

    if (isCheckoutResponseUrlDto(response)) {
      await push(response.url);
    } else if (response.order) {
      await push(routerPaths.checkout_success(response.order));
    }

    // Cart cleanup is best-effort: a failure here must not roll back the
    // order or surface a confusing promocode-race toast post-success.
    try {
      await deleteCart().unwrap();
    } catch {
      // Intentionally swallowed — order is already placed.
    }
  };

  const deliveryMethodsOptions = useMemo(() => {
    if (!deliveryMethods) return [];

    return deliveryMethods.map(checkoutOptionsMapper.mapDeliveryMethodToOptions);
  }, [deliveryMethods]);

  // Exposed so the form can proactively query pickup availability and inject
  // `disabled` onto this option (Step 3.3) even before store is selected.
  const storeDeliveryMethod = useMemo(
    () => deliveryMethods?.find((method) => method.type === 'storage' && method.code === 'store'),
    [deliveryMethods],
  );

  const getChosenDeliveryMethod = (methodId: string) => deliveryMethods?.find((method) => method.id === methodId);

  const getAddressDeliveryMethodId = () => findDeliveryMethodByType(deliveryMethods, 'address')?.id;

  return {
    submitCheckoutForm,
    getChosenDeliveryMethod,
    deliveryMethodsOptions,
    paymentMethodsOptions,
    getAddressDeliveryMethodId,
    storeDeliveryMethod,
  };
};
