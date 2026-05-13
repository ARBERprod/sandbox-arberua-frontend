import { isBusinessError } from '@/shared/types/type-guards';

export type PromocodeErrorCategory =
  | { kind: 'validation'; code: string | null }
  | { kind: 'cta'; code: 'PROMOCODE_USER_PHONE_MISSING' | 'PROMOCODE_CLIENT_NOT_FOUND' }
  | { kind: 'service'; code: 'PROMOCODE_SERVICE_UNAVAILABLE' | null };

export const categorizePromocodeError = (error: unknown): PromocodeErrorCategory => {
  if (isBusinessError(error)) {
    const { code } = error.data.error;
    if (code === 'PROMOCODE_USER_PHONE_MISSING' || code === 'PROMOCODE_CLIENT_NOT_FOUND') {
      return { kind: 'cta', code };
    }
    if (code === 'PROMOCODE_SERVICE_UNAVAILABLE') {
      return { kind: 'service', code };
    }
    return { kind: 'validation', code };
  }
  return { kind: 'service', code: null };
};
