import { Validator } from './Validator';
import { ValidatorType } from '../types';

interface HasNumberValidatorOptions {
  message?: string;
}

export class HasNumberValidator implements Validator {
  static defaultErrorMessage = 'Value should contain at least one number';
  readonly _validator: true = true;
  message: string;
  type: ValidatorType.HAS_NUMBER = ValidatorType.HAS_NUMBER;

  constructor(options?: HasNumberValidatorOptions) {
    this.message = options?.message || HasNumberValidator.defaultErrorMessage;
  }

  validate(fieldValue: string): string {
    if (/\d/.test(fieldValue)) return '';
    return this.message;
  }
}
