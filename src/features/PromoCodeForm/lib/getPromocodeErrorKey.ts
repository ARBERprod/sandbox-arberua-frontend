const KNOWN_CODES = new Set([
  'PROMOCODE_CODE_REQUIRED',
  'PROMOCODE_CART_EMPTY',
  'PROMOCODE_NOT_FOUND',
  'PROMOCODE_NOT_FOR_WEB',
  'PROMOCODE_ALREADY_USED',
  'PROMOCODE_EXPIRED',
  'PROMOCODE_NO_ELIGIBLE_ITEMS',
]);

export const getPromocodeErrorKey = (code: string | null | undefined): string => {
  if (code && KNOWN_CODES.has(code)) {
    return `checkout-page:promocode.error.${code}`;
  }
  return 'checkout-page:promocode.error.unknown';
};
