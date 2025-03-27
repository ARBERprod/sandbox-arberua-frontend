import { ValidatorType } from '../types';
import { ProvideRequiredValidator, Validator } from './Validator';

interface RequiredValidatorOptions {
  message?: string;
}

export class RequiredValidator implements Validator, ProvideRequiredValidator {
  static defaultErrorMessage = 'Field is required!';
  readonly _required: true = true;
  readonly _validator: true = true;
  type: ValidatorType = ValidatorType.IS_REQUIRED;
  message: string;

  constructor(options?: RequiredValidatorOptions) {
    this.message = options?.message || RequiredValidator.defaultErrorMessage;
  }

  validate(fieldValue: any): string {
    if (!fieldValue) return this.message;
    if (typeof fieldValue === 'string' && !fieldValue.trim()) return this.message;
    if (Array.isArray(fieldValue) && fieldValue.length === 0) return this.message;
    return '';
  }
}
