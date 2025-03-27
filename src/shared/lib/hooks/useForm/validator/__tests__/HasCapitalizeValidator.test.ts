import { testValidator } from './validatorTestUtils';
import { HasCapitalizeValidator } from '../validators/HasCapitalizeValidator';

describe('HasCapitalizeValidator', () => {
  const VALID_VALUE = 'ValidValue';
  const INVALID_VALUE = 'invalid value';

  let validator:HasCapitalizeValidator;

  beforeEach(() => {
    validator = new HasCapitalizeValidator();
  });

  describe('Instance should be correct validator', () => {
    const validator = new HasCapitalizeValidator();
    testValidator(validator);
  });

  it('Should return default error message, if no custom message provided in constructor', () => {
    const errorMessage = validator.validate(INVALID_VALUE);

    expect(errorMessage).toBe(HasCapitalizeValidator.defaultErrorMessage);
  });
  it('Should return error message, if input data do not contains capitalize letter', () => {
    const customErrorMessage = 'customErrorMessage';
    validator = new HasCapitalizeValidator({ message: customErrorMessage });

    const errorMessage = validator.validate(INVALID_VALUE);

    expect(errorMessage).toBe(customErrorMessage);
  });
  it('Should return empty string, if value is valid', () => {
    const errorMessage = validator.validate(VALID_VALUE);

    expect(errorMessage).toBe('');
  });
});
