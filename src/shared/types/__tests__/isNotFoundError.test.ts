import { isNotFoundError } from '../type-guards';

describe('isNotFoundError type-guard', () => {
  it('accepts an HTTP 404 answer', () => {
    expect(isNotFoundError({
      status: 404,
      data: { success: false },
    })).toBe(true);
  });

  it('rejects every other HTTP status', () => {
    expect(isNotFoundError({ status: 500, data: {} })).toBe(false);
    expect(isNotFoundError({ status: 503, data: {} })).toBe(false);
    expect(isNotFoundError({ status: 200, data: {} })).toBe(false);
  });

  // The whole point of the guard: these are broken plumbing, not a missing page. Answering 404 to
  // them de-indexes live pages (docs/runbooks/diagnose-product-404.md).
  it('rejects the fetchBaseQuery failures that never became a response', () => {
    expect(isNotFoundError({ status: 'FETCH_ERROR', error: 'TypeError: Failed to fetch' })).toBe(false);
    expect(isNotFoundError({ status: 'TIMEOUT_ERROR', error: 'AbortError' })).toBe(false);
    expect(isNotFoundError({ status: 'CUSTOM_ERROR', error: 'boom' })).toBe(false);
  });

  // A 404 body the parser choked on stays a 500 for us: v2 always answers JSON, so this is a
  // broken backend rather than a disabled section.
  it('rejects a parsing error even when the original status was 404', () => {
    expect(isNotFoundError({
      status: 'PARSING_ERROR',
      originalStatus: 404,
      data: '<html lang="uk"></html>',
      error: 'Unexpected token <',
    })).toBe(false);
  });

  // An aborted request — what a per-request timeout surfaces as — is a SerializedError, not a
  // FetchBaseQueryError, and carries no status at all.
  it('rejects a SerializedError', () => {
    expect(isNotFoundError({ name: 'AbortError', message: 'Aborted due to timeout' })).toBe(false);
  });

  it('rejects nothing at all', () => {
    expect(isNotFoundError(undefined)).toBe(false);
    expect(isNotFoundError(null)).toBe(false);
    expect(isNotFoundError(404)).toBe(false);
  });
});
