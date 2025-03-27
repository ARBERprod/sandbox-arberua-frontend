import { FormField } from '../FormField';

export const isField = (object: any): object is FormField => {
  if (typeof object !== 'object' || object === null) return false;
  return '_field' in object;
};
