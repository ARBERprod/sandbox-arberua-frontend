import { HasSpecSymbolValidator } from '../validators/HasSpecSymbolValidator';
import { testValidator } from './validatorTestUtils';

describe('HasSpecSymbolValidator', () => {
  const VALID_VALUE = 'valid_value+$';
  const INVALID_VALUE = 'invalidvalue';

  let validator:HasSpecSymbolValidator;

  beforeEach(() => {
    validator = new HasSpecSymbolValidator();
  });

  describe('Instance should be correct validator', () => {
    const validator = new HasSpecSymbolValidator();
    testValidator(validator);
  });

  it('Should return default error message, if no custom message provided in constructor', () => {
    const errorMessage = validator.validate(INVALID_VALUE);

    expect(errorMessage).toBe(HasSpecSymbolValidator.defaultErrorMessage);
  });
  it('Should return error message, if input data is invalid', () => {
    const customErrorMessage = 'customErrorMessage';
    validator = new HasSpecSymbolValidator({ message: customErrorMessage });

    const errorMessage = validator.validate(INVALID_VALUE);

    expect(errorMessage).toBe(customErrorMessage);
  });
  it('Should return empty string, if value is valid', () => {
    const errorMessage = validator.validate(VALID_VALUE);

    expect(errorMessage).toBe('');
  });
});
