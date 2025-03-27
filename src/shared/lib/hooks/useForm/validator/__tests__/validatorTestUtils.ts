import { type AbstractValidator, ProvideRequiredValidator, TargetValidator } from '../validators/Validator';

export const testValidator = (validator: AbstractValidator) => {
  it('Should contain _validator field', () => {
    expect('_validator' in validator).toBe(true);
    expect(validator._validator).toBe(true);
  });
  it('Should contain "type"', () => {
    expect('type' in validator).toBe(true);
  });
  it('Should contain "message" string field', () => {
    expect('message' in validator).toBe(true);
    expect(typeof validator.message).toBe('string');
  });
  it('Should contain "validate" function', () => {
    expect('validate' in validator).toBe(true);
    expect(typeof validator.validate).toBe('function');
  });
};

export const testTargetValidator = (validator: TargetValidator) => {
  testValidator(validator);
  it('Should contain all required for target validator fields', () => {
    expect('target' in validator).toBe(true);
    expect(typeof validator.target).toBe('string');
  });
};

export const testProvideRequiredValidator = (validator: ProvideRequiredValidator) => {
  testValidator(validator);
  it('Should contain all required for required validator fields', () => {
    expect('_required' in validator).toBe(true);
    expect(validator._required).toBe(true);
  });
};
