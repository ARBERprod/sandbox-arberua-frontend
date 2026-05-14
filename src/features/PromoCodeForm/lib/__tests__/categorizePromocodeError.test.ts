import { categorizePromocodeError } from '../categorizePromocodeError';

const makeBusinessError = (code: string, status = 422) => ({
  status,
  data: {
    success: false as const,
    error: { code, message: 'whatever' },
  },
});

describe('categorizePromocodeError', () => {
  describe('CTA category', () => {
    it.each(['PROMOCODE_USER_PHONE_MISSING', 'PROMOCODE_CLIENT_NOT_FOUND'])(
      'categorizes "%s" as { kind: "cta" }',
      (code) => {
        expect(categorizePromocodeError(makeBusinessError(code))).toEqual({
          kind: 'cta',
          code,
        });
      },
    );
  });

  describe('Service category', () => {
    it('categorizes PROMOCODE_SERVICE_UNAVAILABLE as { kind: "service" }', () => {
      expect(categorizePromocodeError(makeBusinessError('PROMOCODE_SERVICE_UNAVAILABLE', 503)))
        .toEqual({ kind: 'service', code: 'PROMOCODE_SERVICE_UNAVAILABLE' });
    });

    it('falls back to { kind: "service", code: null } for non-business errors (network / 5xx)', () => {
      expect(categorizePromocodeError({ status: 'FETCH_ERROR', error: 'Network error' }))
        .toEqual({ kind: 'service', code: null });
      expect(categorizePromocodeError(undefined)).toEqual({ kind: 'service', code: null });
      expect(categorizePromocodeError(null)).toEqual({ kind: 'service', code: null });
    });
  });

  describe('Validation category', () => {
    const validationCodes = [
      'PROMOCODE_CODE_REQUIRED',
      'PROMOCODE_CART_EMPTY',
      'PROMOCODE_NOT_FOUND',
      'PROMOCODE_NOT_FOR_WEB',
      'PROMOCODE_ALREADY_USED',
      'PROMOCODE_EXPIRED',
      'PROMOCODE_NO_ELIGIBLE_ITEMS',
    ];

    it.each(validationCodes)('categorizes known validation code "%s"', (code) => {
      expect(categorizePromocodeError(makeBusinessError(code)))
        .toEqual({ kind: 'validation', code });
    });

    it('categorizes unknown business code as validation (fallback)', () => {
      expect(categorizePromocodeError(makeBusinessError('PROMOCODE_FUTURE_CODE')))
        .toEqual({ kind: 'validation', code: 'PROMOCODE_FUTURE_CODE' });
    });
  });
});
