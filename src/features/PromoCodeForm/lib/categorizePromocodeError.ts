import { isBusinessError } from '@/shared/types/type-guards';
import {
  isPromocodeCtaCode,
  isPromocodeServiceCode,
  isPromocodeValidationCode,
  PromocodeCtaCode,
  PromocodeValidationCode,
} from '@/entities/Cart';

export type PromocodeErrorCategory =
  | { kind: 'validation'; code: PromocodeValidationCode | null }
  | { kind: 'cta'; code: PromocodeCtaCode }
  | { kind: 'service' };

export const categorizePromocodeError = (error: unknown): PromocodeErrorCategory => {
  if (isBusinessError(error)) {
    const { code } = error.data.error;
    if (isPromocodeCtaCode(code)) {
      return { kind: 'cta', code };
    }
    if (isPromocodeServiceCode(code)) {
      return { kind: 'service' };
    }
    if (isPromocodeValidationCode(code)) {
      return { kind: 'validation', code };
    }
    // Unknown business code — fall back to "unknown" rendering and signal the
    // null so the form logs the unrecognised payload.
    return { kind: 'validation', code: null };
  }
  return { kind: 'service' };
};
