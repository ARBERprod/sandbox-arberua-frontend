import { isField } from './type-guards';
import { FormState } from '../types';

export const getFormData = <FormData extends object>(formData: FormState<FormData>): FormData => Object
  .entries(formData)
  .reduce((acc: any, [key, value]) => {
    if (isField(value)) {
      acc[key] = value.value;
    } else if (Array.isArray(value)) {
      acc[key] = value.map((item) => {
        if (isField(item)) {
          return item.value;
        }
        return getFormData(item);
      });
    } else {
      acc[key] = getFormData(value);
    }
    return acc;
  }, {});
