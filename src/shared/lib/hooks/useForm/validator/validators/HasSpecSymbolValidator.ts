import { Validator } from './Validator';
import { ValidatorType } from '../types';

interface HasSpecSymbolValidatorOptions {
  message?: string;
}

export class HasSpecSymbolValidator implements Validator {
  static defaultErrorMessage = 'Value should contain at least one special symbol';
  readonly _validator: true = true;
  message: string;
  type: ValidatorType.HAS_SPEC_SYMBOL = ValidatorType.HAS_SPEC_SYMBOL;

  constructor(options?: HasSpecSymbolValidatorOptions) {
    this.message = options?.message || HasSpecSymbolValidator.defaultErrorMessage;
  }

  validate(fieldValue: string): string {
    if (/[\W_]+/.test(fieldValue)) return '';
    return this.message;
  }
}
