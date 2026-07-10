import {
  isPickupCheckoutCode,
  PickupCheckoutCode,
} from '../model/types/pickupCheckoutCodes';

export type PickupCheckoutErrorI18nKey =
  | `checkout-page:pickup.error.${PickupCheckoutCode}`
  | 'checkout-page:pickup.error.unknown';

// Resolve a backend pickup code to its localized message key (design contract,
// same shape as getPromocodeErrorKey). Backend `message` stays the i18n fallback.
export const getPickupCheckoutErrorKey = (
  code: string | null | undefined,
): PickupCheckoutErrorI18nKey => {
  if (code && isPickupCheckoutCode(code)) {
    return `checkout-page:pickup.error.${code}`;
  }
  return 'checkout-page:pickup.error.unknown';
};
