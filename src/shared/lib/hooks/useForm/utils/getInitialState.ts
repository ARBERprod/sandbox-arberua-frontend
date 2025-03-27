import _isPlainObject from 'lodash.isplainobject';
import { FormField } from '../FormField';
import { FormState } from '../types';

export const getInitialState = <FormData extends object>(initialState: FormData): {
  initState: FormState<FormData>;
  fieldPaths: string[]
} => {
  const fieldPaths: string[] = [];

  const recursiveGetState = (initialState: FormData, pathPrefix = '') => Object.entries(initialState)
    .reduce((acc: FormState<FormData>, [key, value]) => {
      if (_isPlainObject(value)) {
        // @ts-ignore
        acc[key] = recursiveGetState(value, `${pathPrefix}${key}.`);
      } else if (Array.isArray(value)) {
        // @ts-ignore
        acc[key] = value.map((arrayEl, index) => {
          if (_isPlainObject(arrayEl)) {
            return recursiveGetState(arrayEl, `${pathPrefix}${key}.${index}.`);
          }
          const formField = new FormField(arrayEl, `${pathPrefix}${key}.${index}`);
          fieldPaths.push(formField.path);
          return formField;
        });
      } else {
        const formField = new FormField(value, `${pathPrefix}${key}`);
        fieldPaths.push(formField.path);
        // @ts-ignore
        acc[key] = formField;
      }
      return acc;
    }, {} as FormState<FormData>);
  const initState = recursiveGetState(initialState);

  return {
    fieldPaths,
    initState,
  };
};
