import { ValidationError } from '@/shared/types/api';

type FieldErrors = {
  [key: string]: string;
}

export const getFormErrors = (error: ValidationError): FieldErrors => Object.entries(error.data.errors)
  .reduce((acc: FieldErrors, [fieldName, errorsArray]) => {
    // eslint-disable-next-line prefer-destructuring
    acc[fieldName] = errorsArray.join('\n');
    return acc;
  }, {} as FieldErrors);

export const validationErrorHandler = (error: ValidationError) => {
  throw getFormErrors(error);
};
