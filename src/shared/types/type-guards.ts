import { Fragment, ReactFragment } from 'react';
import { CredentialsError, StatusCode, ValidationError } from '@/shared/types/api';
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

export const isFunction = (
  arg: unknown,
): arg is AnyFunction => typeof arg === 'function';
