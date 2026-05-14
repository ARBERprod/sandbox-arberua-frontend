// Single source of truth for promocode business-error codes emitted by the
// backend (see docs/2026-05-13-promocode-frontend-contract.md). Every feature
// that branches on a code must import from this module.

export const PROMOCODE_VALIDATION_CODES = [
  'PROMOCODE_CODE_REQUIRED',
  'PROMOCODE_CART_EMPTY',
  'PROMOCODE_NOT_FOUND',
  'PROMOCODE_NOT_FOR_WEB',
  'PROMOCODE_ALREADY_USED',
  'PROMOCODE_EXPIRED',
  'PROMOCODE_NO_ELIGIBLE_ITEMS',
] as const;

export const PROMOCODE_CTA_CODES = [
  'PROMOCODE_USER_PHONE_MISSING',
  'PROMOCODE_CLIENT_NOT_FOUND',
] as const;

export const PROMOCODE_SERVICE_CODES = [
  'PROMOCODE_SERVICE_UNAVAILABLE',
] as const;

// Validation codes that can also fire on order create (cart applied a code
// that became invalid between rendering and checkout submit).
export const PROMOCODE_CHECKOUT_RACE_CODES = [
  'PROMOCODE_ALREADY_USED',
  'PROMOCODE_EXPIRED',
  'PROMOCODE_NO_ELIGIBLE_ITEMS',
] as const;

export type PromocodeValidationCode = typeof PROMOCODE_VALIDATION_CODES[number];
export type PromocodeCtaCode = typeof PROMOCODE_CTA_CODES[number];
export type PromocodeServiceCode = typeof PROMOCODE_SERVICE_CODES[number];
export type PromocodeCheckoutRaceCode = typeof PROMOCODE_CHECKOUT_RACE_CODES[number];

export type PromocodeErrorCode =
  | PromocodeValidationCode
  | PromocodeCtaCode
  | PromocodeServiceCode;

const VALIDATION_SET: ReadonlySet<string> = new Set(PROMOCODE_VALIDATION_CODES);
const CTA_SET: ReadonlySet<string> = new Set(PROMOCODE_CTA_CODES);
const SERVICE_SET: ReadonlySet<string> = new Set(PROMOCODE_SERVICE_CODES);
const RACE_SET: ReadonlySet<string> = new Set(PROMOCODE_CHECKOUT_RACE_CODES);

export const isPromocodeValidationCode = (code: string): code is PromocodeValidationCode => (
  VALIDATION_SET.has(code)
);

export const isPromocodeCtaCode = (code: string): code is PromocodeCtaCode => (
  CTA_SET.has(code)
);

export const isPromocodeServiceCode = (code: string): code is PromocodeServiceCode => (
  SERVICE_SET.has(code)
);

export const isPromocodeCheckoutRaceCode = (code: string): code is PromocodeCheckoutRaceCode => (
  RACE_SET.has(code)
);
