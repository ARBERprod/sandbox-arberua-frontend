import { TargetValidator } from './Validator';
import { ValidatorType } from '../types';

interface RequiredWithValidatorOptions {
  message?: string;
  target: string
}

export class RequiredWithValidator implements TargetValidator {
  readonly _validator: true = true;
  type: ValidatorType.REQUIRED_WITH = ValidatorType.REQUIRED_WITH;
  message: string;
  target: string;

  constructor({ message, target }: RequiredWithValidatorOptions) {
    this.target = target;
    this.message = message || `Field is required when ${target} is not empty`;
  }

  validate(fieldValue: any, targetValue: any): string {
    if (typeof targetValue === 'string' && !targetValue.trim()) return '';
    if (!targetValue) return '';
    if (Array.isArray(targetValue) && targetValue.length === 0) return '';

    if (typeof fieldValue === 'string' && !fieldValue.trim()) return this.message;
    if (!fieldValue) return this.message;
    if (Array.isArray(fieldValue) && fieldValue.length === 0) return this.message;
    return '';
  }
}
