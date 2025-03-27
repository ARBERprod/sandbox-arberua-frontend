import _unset from 'lodash.unset';
import _get from 'lodash.get';
import { set as _set } from 'object-path';
import type { TargetValidator, Validator } from './validators/Validator';
import { FormState, ValidatorConfig } from '../types';

const isTargetValidator = (validator: Validator | TargetValidator): validator is TargetValidator => 'target'
  in validator;

export class FormValidator<T extends object> {
  private config: ValidatorConfig<T>;

  constructor(config: ValidatorConfig<T>) {
    this.config = config;
  }

  private getExistingConfig(fieldName: string) {
    return _get(this.config, fieldName);
  }

  getConfig() {
    return this.config;
  }

  appendConfig(fieldName: string, validators: (TargetValidator | Validator)[]) {
    const validatorsExist = _get(this.config, fieldName);
    if (validatorsExist === undefined) {
      _set(this.config, fieldName, validators);
      return this;
    }
    if (Array.isArray(validatorsExist)) {
      if (validatorsExist.length === 0) {
        _set(this.config, fieldName, [validatorsExist]);
        return this;
      }
      if (!Array.isArray(validatorsExist[0])) {
        _set(this.config, fieldName, [...this.getExistingConfig(fieldName), ...validatorsExist]);
        return this;
      }
      return this;
    }

    throw Error('Cannot append validators');
  }

  removeConfig(fieldName: string) {
    const validatorExist = _get(this.config, fieldName);
    if (validatorExist === undefined) return this;
    _unset(this.config, fieldName);
    return this;
  }

  getFieldError(formState: FormState<T>, fieldName: string): string {
    const field = _get(formState, fieldName);
    if (!field) {
      throw Error(`Form state doesn't contain field with path "${fieldName}"`);
    }
    const validators: TargetValidator[] | Validator[] = _get(this.config, fieldName);
    if (!validators || validators.length === 0) return '';

    const fieldIsRequired = validators.some((validator) => '_required' in validator);
    let fieldError = '';

    // eslint-disable-next-line
    for (const validator of validators) {
      let error = '';
      if (isTargetValidator(validator)) {
        const targetField = _get(formState, validator.target);
        if (targetField === undefined) {
          throw Error(`Target field "${validator.target}" is not defined!`);
        }
        error = validator.validate(field.value, targetField.value);
      } else if (fieldIsRequired || Boolean(field.value)) {
        error = validator.validate(field.value);
      }
      if (error && !fieldError) fieldError = error;
    }

    return fieldError;
  }

  getFormErrors(formState: FormState<T>, fieldPaths: string[]) {
    const errors = {};
    // eslint-disable-next-line
    for (const fieldPath of fieldPaths) {
      const error = this.getFieldError(formState, fieldPath);
      if (error) {
        _set(errors, fieldPath, error);
      }
    }

    return errors;
  }
}
