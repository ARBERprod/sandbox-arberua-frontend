import i18next from 'i18next';
import { isBusinessError, isValidationError } from '@/shared/types/type-guards';
import { CheckoutFormData } from '../model/types/CheckoutFormData';
import { useCheckoutMutation, useGetDeliveryMethodsQuery, useGetPaymentMethodsQuery } from '../api/checkoutApi';
import { getPromocodeErrorKey, isPromocodeCheckoutRaceCode, useDeleteCartMutation } from '@/entities/Cart';
import { isPickupCheckoutCode, isPickupStockChangedCode } from '../model/types/pickupCheckoutCodes';
import { getPickupCheckoutErrorKey } from './getPickupCheckoutErrorKey';
import { getDeliveryMethodById } from './getDeliveryMethodById';
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

type UseCheckoutParams = {
  // Reaction for the recoverable pickup_stock_changed 422: the component refetches
  // the point list, drops the stale selection and highlights the picker. Injected
  // (not owned here) because point query + form state live in CheckoutForm.
  onPickupStockChanged?: () => void;
};

export const useCheckout = ({ onPickupStockChanged }: UseCheckoutParams = {}) => {
  const { push } = useRouter();
  const dispatch = useAppDispatch();
  const { data: paymentMethodsOptions } = useGetPaymentMethodsQuery();
  const { data: deliveryMethods } = useGetDeliveryMethodsQuery();
  const [checkout] = useCheckoutMutation();
  const [deleteCart] = useDeleteCartMutation();

  const submitCheckoutForm = async (data: CheckoutFormData) => {
    // A storage method (in-store pickup or a Nova Poshta branch) can't be ordered
    // without a chosen point. Guard here rather than in validatorConfig — useForm
    // builds its validator once and can't swap rules on the selected method — so
    // block the submit and surface a warehouse_id field error instead of leaning on
    // the backend 422. In the store-UNAVAILABLE case the picker is hidden and the
    // diagnostics block already explains why, so this simply stops the submit there.
    const chosenMethod = getDeliveryMethodById(deliveryMethods, data.delivery_method_id);
    if (chosenMethod?.type === 'storage' && !data.warehouse_id) {
      const warehouseError = { warehouse_id: i18next.t('validation.required') };
      throw warehouseError;
    }

    let response;
    try {
      response = await checkout(
        prepareCheckoutData(data, deliveryMethods),
      ).unwrap();
    } catch (e) {
      // General business-error dispatch on the code, BEFORE any code-specific
      // branch — a pickup code must not fall through to the generic `throw e`.
      if (isBusinessError(e)) {
        const { code, message } = e.data.error;

        if (isPickupCheckoutCode(code)) {
          // Stock verification failed at submit. Localise the message (backend message
          // as fallback), mirror the promocode-race pattern (handle, then re-throw so
          // the form sees a failure).
          getNotify({
            type: 'error',
            content: i18next.t(getPickupCheckoutErrorKey(code), { defaultValue: message }),
          }).notify();
          // pickup_stock_changed is recoverable → re-pick a point (component reaction).
          // pickup_stock_unavailable is a transient 1C outage → keep the selection.
          if (isPickupStockChangedCode(code)) {
            onPickupStockChanged?.();
          }
          throw e;
        }

        if (isPromocodeCheckoutRaceCode(code)) {
          // Race between devices: promocode invalidated server-side after the
          // cart was rendered. Show a locale-specific message (backend message
          // as fallback) and pull a fresh cart so the user sees corrected totals
          // before re-submitting.
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
  // `disabled` onto this option even before store is selected.
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
