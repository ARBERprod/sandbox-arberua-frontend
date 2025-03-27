import { Validator } from './Validator';
import { ValidatorType } from '../types';

interface HasCapitalizeValidatorOptions {
  message?: string;
}

export class HasCapitalizeValidator implements Validator {
  static defaultErrorMessage = 'Value should contain at least one uppercase letter';
  readonly _validator = true;
  message: string;
  type = ValidatorType.HAS_CAPITALIZE as const;

  constructor(options?: HasCapitalizeValidatorOptions) {
    this.message = options?.message || HasCapitalizeValidator.defaultErrorMessage;
  }

  validate(fieldValue: string): string {
    if (/[A-Z]+/.test(fieldValue)) return '';
    return this.message;
  }
}
