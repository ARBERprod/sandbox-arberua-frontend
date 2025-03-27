import { RequiredValidator } from '../validators/RequiredValidator';
import { testProvideRequiredValidator } from './validatorTestUtils';

describe('RequiredValidator', () => {
  let validator:RequiredValidator;
  const customErrorMessage = 'customErrorMessage';
  const INVALID_VALUE = '';
  const VALID_VALUE = 'valid value';

  beforeEach(() => {
    validator = new RequiredValidator();
  });

  describe('Instance should be correct validator', () => {
    const validator = new RequiredValidator();
    testProvideRequiredValidator(validator);
  });

  it('Should return default error message, if no custom message provided in constructor', () => {
    const errorMessage = validator.validate(INVALID_VALUE);

    expect(errorMessage).toBe(RequiredValidator.defaultErrorMessage);
  });
  it('Should return error message, if input data invalid', () => {
    validator = new RequiredValidator({ message: customErrorMessage });

    const errorMessage = validator.validate(INVALID_VALUE);

    expect(errorMessage).toBe(customErrorMessage);
  });
  it('Should return empty string, if value is valid', () => {
    const errorMessage = validator.validate(VALID_VALUE);

    expect(errorMessage).toBe('');
  });
  it('Should return error message, if passed nullable value', () => {
    expect(validator.validate(null)).toBe(RequiredValidator.defaultErrorMessage);
    expect(validator.validate(undefined)).toBe(RequiredValidator.defaultErrorMessage);
    expect(validator.validate(false)).toBe(RequiredValidator.defaultErrorMessage);
  });

  it('Should return error message, if passed empty array', () => {
    expect(validator.validate([])).toBe(RequiredValidator.defaultErrorMessage);
  });
});
