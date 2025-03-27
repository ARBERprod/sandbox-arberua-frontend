import { MinValueValidator } from '../validators/MinValueValidator';
import { testValidator } from './validatorTestUtils';

describe('MinValueValidator', () => {
  let validator:MinValueValidator;
  const customErrorMessage = 'customErrorMessage';

  beforeEach(() => {
    validator = new MinValueValidator({ value: 8 });
  });

  describe('Instance should be correct validator', () => {
    const validator = new MinValueValidator({ value: 8 });
    testValidator(validator);
  });

  it('Should return default error message, if no custom message provided in constructor', () => {
    const errorMessage = validator.validate('7');

    expect(errorMessage).toBe('Minimal available value is 8');
  });
  it('Should return error message, if input data invalid', () => {
    validator = new MinValueValidator({ message: customErrorMessage, value: 8 });

    const errorMessage = validator.validate(7);

    expect(errorMessage).toBe(customErrorMessage);
  });
  it('Should return empty string, if value is valid', () => {
    const errorMessage = validator.validate(8);

    expect(errorMessage).toBe('');
  });

  it('Should return empty string, if passed valid string', () => {
    const errorMessage = validator.validate('8');

    expect(errorMessage).toBe('');
  });

  it('Should return error message, if passed invalid value string', () => {
    validator = new MinValueValidator({ message: customErrorMessage, value: 8 });

    const errorMessage = validator.validate('5');

    expect(errorMessage).toBe(customErrorMessage);
  });
});
