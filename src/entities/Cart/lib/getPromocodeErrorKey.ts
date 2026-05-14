import {
  isPromocodeValidationCode,
  PromocodeValidationCode,
} from '../model/types/promocodeCodes';

export type PromocodeErrorI18nKey =
  | `checkout-page:promocode.error.${PromocodeValidationCode}`
  | 'checkout-page:promocode.error.unknown';

export const getPromocodeErrorKey = (
  code: string | null | undefined,
): PromocodeErrorI18nKey => {
  if (code && isPromocodeValidationCode(code)) {
    return `checkout-page:promocode.error.${code}`;
  }
  return 'checkout-page:promocode.error.unknown';
};
