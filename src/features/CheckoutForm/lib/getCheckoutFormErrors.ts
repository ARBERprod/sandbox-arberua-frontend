import { ValidationError } from '@/shared/types/api';
import { getFormErrors } from '@/shared/lib/utils/validationErrorHandler';

export const getCheckoutFormErrors = (error: ValidationError) => {
  const formErrors = getFormErrors(error);
  formErrors.warehouse_id = formErrors.store_id || formErrors.new_post || '';
  return formErrors;
};
