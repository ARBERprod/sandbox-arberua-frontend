import { isBusinessError } from '../type-guards';

describe('isBusinessError type-guard', () => {
  it('accepts a well-formed BusinessError shape', () => {
    const err = {
      status: 422,
      data: {
        success: false,
        error: { code: 'PROMOCODE_EXPIRED', message: 'Промокод прострочений' },
      },
    };
    expect(isBusinessError(err)).toBe(true);
  });

  it('accepts BusinessError with status other than 422 (e.g. 503)', () => {
    const err = {
      status: 503,
      data: {
        success: false,
        error: { code: 'PROMOCODE_SERVICE_UNAVAILABLE', message: '1С недоступний' },
      },
    };
    expect(isBusinessError(err)).toBe(true);
  });

  it('rejects success=true responses', () => {
    expect(isBusinessError({
      status: 200,
      data: { success: true, data: { foo: 'bar' } },
    })).toBe(false);
  });

  it('rejects ValidationError shape (success flag missing, errors map instead of error object)', () => {
    expect(isBusinessError({
      status: 422,
      data: { errors: { code: ['required'] } },
    })).toBe(false);
  });

  it('rejects when data.error.code is missing', () => {
    expect(isBusinessError({
      status: 422,
      data: { success: false, error: { message: 'no code' } },
    })).toBe(false);
  });

  it('rejects when data.error.message is missing', () => {
    expect(isBusinessError({
      status: 422,
      data: { success: false, error: { code: 'PROMOCODE_EXPIRED' } },
    })).toBe(false);
  });

  it('rejects when data.error.code is not a string', () => {
    expect(isBusinessError({
      status: 422,
      data: { success: false, error: { code: 42, message: 'msg' } },
    })).toBe(false);
  });

  it('rejects when data.error.code is an empty string (contract requires a non-empty code)', () => {
    expect(isBusinessError({
      status: 422,
      data: { success: false, error: { code: '', message: 'msg' } },
    })).toBe(false);
  });

  it('rejects when data is not an object', () => {
    expect(isBusinessError({ status: 422, data: 'string-body' })).toBe(false);
  });

  it('rejects null / undefined / primitives', () => {
    expect(isBusinessError(null)).toBe(false);
    expect(isBusinessError(undefined)).toBe(false);
    expect(isBusinessError(42)).toBe(false);
    expect(isBusinessError('error')).toBe(false);
    expect(isBusinessError(true)).toBe(false);
  });

  it('rejects empty object', () => {
    expect(isBusinessError({})).toBe(false);
  });

  it('rejects when data is null (success/error fields absent)', () => {
    expect(isBusinessError({ status: 422, data: null })).toBe(false);
  });

  it('narrows generic param so consumers can switch on a typed code', () => {
    type PromoCode = 'PROMOCODE_EXPIRED' | 'PROMOCODE_ALREADY_USED';
    const err: unknown = {
      status: 422,
      data: { success: false, error: { code: 'PROMOCODE_EXPIRED', message: 'm' } },
    };
    if (isBusinessError<PromoCode>(err)) {
      // Compile-time check: code should narrow to PromoCode union.
      const { code } = err.data.error;
      const _typed: PromoCode = code;
      expect(_typed).toBe('PROMOCODE_EXPIRED');
    } else {
      throw new Error('expected isBusinessError to narrow');
    }
  });
});
