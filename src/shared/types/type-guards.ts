import { Fragment, ReactFragment } from 'react';
import {
  BusinessError,
  CredentialsError,
  StatusCode,
  ValidationError,
} from '@/shared/types/api';
import { AnyFunction } from '@/shared/types/common';

export function isReactFragment(variableToInspect: any): variableToInspect is ReactFragment {
  if (variableToInspect.type) {
    return variableToInspect.type === Fragment;
  }
  return variableToInspect === Fragment;
}

export function isValidationError(error: unknown): error is ValidationError {
  if (error === null || error === undefined) return false;
  if (typeof error !== 'object') return false;
  return (
    ('status' in error)
    && error.status === StatusCode.VALIDATION_ERROR
    && ('data' in error)
    && typeof error.data === 'object'
    && error.data !== null
    && ('errors' in error.data)
    && typeof error.data.errors === 'object'
    && error.data.errors !== null
  );
}

export function isCredentialsError(error: unknown): error is CredentialsError {
  if (error === null || error === undefined) return false;
  if (typeof error !== 'object') return false;

  return (
    ('status' in error)
    && error.status === StatusCode.VALIDATION_ERROR
    && ('data' in error)
    && typeof error.data === 'object'
    && error.data !== null
    && ('errors' in error.data)
    && (typeof error.data.errors === 'object')
    && (error.data.errors !== null)
    && ('success' in error.data)
    && error.data.success === false
  );
}

export function isBusinessError<TCode extends string = string>(
  error: unknown,
): error is BusinessError<TCode> {
  if (error === null || error === undefined) return false;
  if (typeof error !== 'object') return false;

  return (
    ('data' in error)
    && typeof error.data === 'object'
    && error.data !== null
    && ('success' in error.data)
    && error.data.success === false
    && ('error' in error.data)
    && typeof error.data.error === 'object'
    && error.data.error !== null
    && ('code' in error.data.error)
    && typeof error.data.error.code === 'string'
    && error.data.error.code.length > 0
    && ('message' in error.data.error)
    && typeof error.data.error.message === 'string'
  );
}

/**
 * True only for an HTTP 404 answer. Everything else RTK Query reports — 5xx, `FETCH_ERROR`,
 * `TIMEOUT_ERROR`, an aborted request — is a broken backend, and serving those as "page not found"
 * de-indexes live pages (docs/runbooks/diagnose-product-404.md).
 */
export function isNotFoundError(error: unknown): boolean {
  if (error === null || error === undefined) return false;
  if (typeof error !== 'object') return false;

  return ('status' in error) && error.status === StatusCode.NOT_FOUND;
}

export const isFunction = (
  arg: unknown,
): arg is AnyFunction => typeof arg === 'function';
