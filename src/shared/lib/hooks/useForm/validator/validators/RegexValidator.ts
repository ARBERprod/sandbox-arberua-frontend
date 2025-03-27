import { Validator } from './Validator';
import { ValidatorType } from '../types';

interface RegexValidatorOptions {
  message?: string;
  value: RegExp;
}

export class RegexValidator implements Validator {
  static defaultErrorMessage = 'Value doesn`t match with regex';
  _validator: true = true;
  message: string;
  value: RegExp;
  type: ValidatorType.REGEXP = ValidatorType.REGEXP;

  constructor({ message, value }:RegexValidatorOptions) {
    this.value = value;
    this.message = message || RegexValidator.defaultErrorMessage;
  }

  validate(fieldValue: string) {
    if (!this.value.test(fieldValue)) return this.message;
    return '';
  }
}
