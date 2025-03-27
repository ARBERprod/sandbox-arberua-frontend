import { MaxLengthValidator } from '../validators/MaxLengthValidator';
import { testValidator } from './validatorTestUtils';

describe('MaxLengthValidator', () => {
  const VALID_VALUE = 'valid';
  const INVALID_VALUE = 'invalid value length';
  const VALID_EDGE_VALUE = '88888888';

  let validator:MaxLengthValidator;

  beforeEach(() => {
    validator = new MaxLengthValidator({ value: 8 });
  });

  describe('Instance should be correct validator', () => {
    const validator = new MaxLengthValidator({ value: 8 });
    testValidator(validator);
  });

  it('Should return default error message, if no custom message provided in constructor', () => {
    const errorMessage = validator.validate(INVALID_VALUE);

    expect(errorMessage).toBe('Cannot be more than 8 symbols');
  });
  it('Should return error message, if input data is invalid', () => {
    const customErrorMessage = 'customErrorMessage';
    validator = new MaxLengthValidator({ message: customErrorMessage, value: 8 });

    const errorMessage = validator.validate(INVALID_VALUE);

    expect(errorMessage).toBe(customErrorMessage);
  });
  it('Should return empty string, if value is valid', () => {
    const errorMessage = validator.validate(VALID_VALUE);

    expect(errorMessage).toBe('');
  });
  it('Should return empty string, if value length = passed value option', () => {
    const errorMessage = validator.validate(VALID_EDGE_VALUE);

    expect(errorMessage).toBe('');
  });
});
