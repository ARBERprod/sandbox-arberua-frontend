import { getPromocodeErrorKey } from '../getPromocodeErrorKey';

describe('getPromocodeErrorKey', () => {
  const knownCodes = [
    'PROMOCODE_CODE_REQUIRED',
    'PROMOCODE_CART_EMPTY',
    'PROMOCODE_NOT_FOUND',
    'PROMOCODE_NOT_FOR_WEB',
    'PROMOCODE_ALREADY_USED',
    'PROMOCODE_EXPIRED',
    'PROMOCODE_NO_ELIGIBLE_ITEMS',
  ];

  it.each(knownCodes)('returns namespaced key for known code "%s"', (code) => {
    expect(getPromocodeErrorKey(code)).toBe(`checkout-page:promocode.error.${code}`);
  });

  it('returns "unknown" key for an unrecognised code', () => {
    expect(getPromocodeErrorKey('PROMOCODE_TOTALLY_NEW_CODE')).toBe(
      'checkout-page:promocode.error.unknown',
    );
  });

  it('returns "unknown" key for null', () => {
    expect(getPromocodeErrorKey(null)).toBe('checkout-page:promocode.error.unknown');
  });

  it('returns "unknown" key for undefined', () => {
    expect(getPromocodeErrorKey(undefined)).toBe('checkout-page:promocode.error.unknown');
  });

  it('returns "unknown" key for empty string', () => {
    expect(getPromocodeErrorKey('')).toBe('checkout-page:promocode.error.unknown');
  });

  it('does not match codes with different casing — KNOWN_CODES is exact match', () => {
    expect(getPromocodeErrorKey('promocode_expired')).toBe('checkout-page:promocode.error.unknown');
  });

  it('does not strip whitespace from the input', () => {
    expect(getPromocodeErrorKey(' PROMOCODE_EXPIRED ')).toBe('checkout-page:promocode.error.unknown');
  });

  it('CTA codes are NOT considered known here (handled by branched render, not by this util)', () => {
    expect(getPromocodeErrorKey('PROMOCODE_USER_PHONE_MISSING')).toBe('checkout-page:promocode.error.unknown');
    expect(getPromocodeErrorKey('PROMOCODE_CLIENT_NOT_FOUND')).toBe('checkout-page:promocode.error.unknown');
    expect(getPromocodeErrorKey('PROMOCODE_SERVICE_UNAVAILABLE')).toBe('checkout-page:promocode.error.unknown');
  });
});
