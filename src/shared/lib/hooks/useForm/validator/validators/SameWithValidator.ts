import { TargetValidator } from './Validator';
import { ValidatorType } from '../types';

interface SameWithValidatorOptions {
  message?: string;
  target: string;
}

export class SameWithValidator implements TargetValidator {
  readonly _validator: true = true;
  message: string;
  target: string;
  type: ValidatorType.SAME_WITH = ValidatorType.SAME_WITH;

  constructor({ message, target }: SameWithValidatorOptions) {
    this.message = message || `Value should be same with ${target} value`;
    this.target = target;
  }

  validate(fieldValue: any, targetValue: any): string {
    if (fieldValue === targetValue) return '';
    return this.message;
  }
}
