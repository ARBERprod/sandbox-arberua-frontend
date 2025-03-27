import { CheckoutFormData } from '../model/types/CheckoutFormData';
import { defaultData } from '../config/formConfig';

export const getInitialState = (
  initData?: Partial<CheckoutFormData>,
): CheckoutFormData => ({ ...defaultData, ...initData });
