import { Validator } from './Validator';
import { ValidatorType } from '../types';

interface OneOfValidatorOptions {
  message?: string;
  value: any | any[];
}

export class OneOfValidator implements Validator {
  readonly _validator: true = true;
  value: any | any[];
  message: string;
  type: ValidatorType = ValidatorType.ONE_OF;

  constructor({ value, message }: OneOfValidatorOptions) {
    this.value = value;
    this.message = message || `Field value should be one of ${value.toString()}`;
  }

  validate(fieldValue: string): string {
    if (typeof this.value === 'string') {
      if (fieldValue !== this.value) return this.message;
    } else if (!this.value.includes(fieldValue)) return this.message;
    return '';
  }
}
