import { TargetValidator } from './Validator';
import { ValidatorType } from '../types';

interface RequiredIfEqualsValidatorOptions {
  message?: string;
  target: string;
  value: any;
}

export class RequiredIfEquals implements TargetValidator {
  readonly _validator: true = true;
  type: ValidatorType.REQUIRED_IF_EQUALS = ValidatorType.REQUIRED_IF_EQUALS;
  message: string;
  target: string;
  value: any;

  constructor({ message, target, value }: RequiredIfEqualsValidatorOptions) {
    this.target = target;
    this.value = value;
    this.message = message || `Field is required if ${target} equals ${value}`;
  }

  validate(fieldValue: any, targetValue: any): string {
    if (targetValue !== this.value) return '';
    if (typeof fieldValue === 'string' && !fieldValue.trim()) return this.message;
    if (!fieldValue) return this.message;
    if (Array.isArray(fieldValue) && fieldValue.length === 0) return this.message;
    return '';
  }
}
