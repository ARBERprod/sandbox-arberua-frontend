import { StatusCode, ValidationError } from '@/shared/types/api';
import { getFormErrors, validationErrorHandler } from '@/shared/lib/utils/validationErrorHandler';

describe('Validation Error handler', () => {
  const validationError:ValidationError = {
    status: StatusCode.VALIDATION_ERROR,
    data: {
      errors: {
        email: ['validation.required'],
        password: ['validation.required'],
      },
    },
  };

  it('Should return errors object', () => {
    const formErrors = getFormErrors(validationError);
    expect(formErrors).toEqual({ email: 'validation.required', password: 'validation.required' });
  });

  it('Should throw error', () => {
    expect(() => {
      validationErrorHandler(validationError);
    }).toThrow();
  });
});
