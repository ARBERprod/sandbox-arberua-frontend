import { ValidatorType } from '../types';

export interface AbstractValidator {
  readonly _validator: true;
  type: ValidatorType;
  message: string;

  validate(...params: any[]): void;
}

export interface TargetValidator extends AbstractValidator {
  target: string;

  validate(fieldValue: any, targetValue: any): string;
}

export interface Validator extends AbstractValidator {
  validate(fieldValue: any): string;
}

export interface ProvideRequiredValidator extends AbstractValidator {
  readonly _required: true;
}
