import { HasNumberValidator } from '../validators/HasNumberValidator';
import { testValidator } from './validatorTestUtils';

describe('HasNumberValidator', () => {
  const VALID_VALUE = 'valid32423value';
  const INVALID_VALUE = 'invalid value';

  let validator:HasNumberValidator;

  beforeEach(() => {
    validator = new HasNumberValidator();
  });

  describe('Instance should be correct validator', () => {
    const validator = new HasNumberValidator();
    testValidator(validator);
  });

  it('Should return default error message, if no custom message provided in constructor', () => {
    const errorMessage = validator.validate(INVALID_VALUE);

    expect(errorMessage).toBe(HasNumberValidator.defaultErrorMessage);
  });
  it('Should return error message, if input data is invalid', () => {
    const customErrorMessage = 'customErrorMessage';
    validator = new HasNumberValidator({ message: customErrorMessage });

    const errorMessage = validator.validate(INVALID_VALUE);

    expect(errorMessage).toBe(customErrorMessage);
  });
  it('Should return empty string, if value is valid', () => {
    const errorMessage = validator.validate(VALID_VALUE);

    expect(errorMessage).toBe('');
  });
});
