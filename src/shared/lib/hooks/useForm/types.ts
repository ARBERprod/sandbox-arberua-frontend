import { FormField } from './FormField';
import { TargetValidator, Validator } from './validator/validators/Validator';

export type ValidationMode = 'onSubmit' | 'onTouched' | 'onChange';

export type ValidatorConfig<FormData> = FormData extends Record<string, any>
  ? {
    [Key in keyof FormData]?: FormData[Key] extends Record<string, any>
      ? ValidatorConfig<FormData[Key]> | (Validator | TargetValidator)[]
      : FormData[Key] extends Array<infer U>
        ? Array<ValidatorConfig<U>> | (Validator | TargetValidator)[]
        : (Validator | TargetValidator)[];
  }
  : (Validator | TargetValidator)[];

export type UseFormProps<FormData> = {
  initialState: FormData;
  onSubmit: (data: FormData, eventId?: string) => void;
  onSuccess?: (eventId?: string) => void;
  validatorConfig?: ValidatorConfig<FormData>;
  validationMode?: ValidationMode;
  clearFormAfterSuccess?: boolean;
}
export type FormState<FormData> = FormData extends Record<string, any>
  ? {
    [Key in keyof FormData]: FormData[Key] extends Record<string, any>
      ? FormState<FormData[Key]>
      : FormData[Key] extends Array<infer U>
        ? Array<FormState<U>>
        : FormField;
  }
  : FormData;

type ArrayIndex<T> = T extends Array<any> ? number : never;

type ObjectPaths<T, K extends keyof T = keyof T> = K extends string
  ? T[K] extends Array<any>
    ? `${K}.${ArrayIndex<T[K]> & keyof T[K]}`
    : T[K] extends object
      ? `${K}.${ObjectPaths<T[K]>}`
      : K
  : never;

export type FormDataPaths<T> = ObjectPaths<T>;
