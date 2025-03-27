import { RegexValidator } from '../validators/RegexValidator';
import { testValidator } from './validatorTestUtils';

describe('RegexValidator', () => {
  let validator:RegexValidator;
  const customErrorMessage = 'customErrorMessage';
  const INVALID_VALUE = 'invalid';
  const VALID_VALUE = 'hello world';

  beforeEach(() => {
    validator = new RegexValidator({ value: /hello/ });
  });

  describe('Instance should be correct validator', () => {
    const validator = new RegexValidator({ value: /hello/ });
    testValidator(validator);
  });

  it('Should return default error message, if no custom message provided in constructor', () => {
    const errorMessage = validator.validate(INVALID_VALUE);

    expect(errorMessage).toBe(RegexValidator.defaultErrorMessage);
  });
  it('Should return error message, if input data invalid', () => {
    validator = new RegexValidator({ message: customErrorMessage, value: /hello/ });

    const errorMessage = validator.validate(INVALID_VALUE);

    expect(errorMessage).toBe(customErrorMessage);
  });
  it('Should return empty string, if value is valid', () => {
    const errorMessage = validator.validate(VALID_VALUE);

    expect(errorMessage).toBe('');
  });
});
