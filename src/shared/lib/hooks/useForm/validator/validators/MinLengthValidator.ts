import { Validator } from './Validator';
import { ValidatorType } from '../types';

interface MinLengthValidatorOptions {
  message?: string;
  value: number;
}

export class MinLengthValidator implements Validator {
  _validator: true = true;
  type: ValidatorType = ValidatorType.MIN_LENGTH;
  message: string;
  value: number;

  constructor({
    message,
    value,
  }: MinLengthValidatorOptions) {
    this.message = message || `Cannot be less than ${value} symbols`;
    this.value = value;
  }

  validate(fieldValue: string): string {
    if (fieldValue.length < this.value) return this.message;
    return '';
  }
}
