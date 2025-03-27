import { Validator } from './Validator';
import { ValidatorType } from '../types';

interface MaxLengthValidatorOptions {
  message?: string;
  value: number;
}

export class MaxLengthValidator implements Validator {
  _validator: true = true;
  type: ValidatorType = ValidatorType.MAX_LENGTH;
  message: string;
  value: number;

  constructor({ message, value }: MaxLengthValidatorOptions) {
    this.message = message || `Cannot be more than ${value} symbols`;
    this.value = value;
  }

  validate(fieldValue: string): string {
    if (fieldValue.length > this.value) return this.message;
    return '';
  }
}
