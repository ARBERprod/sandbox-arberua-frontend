import { OneOfValidator } from '../validators/OneOfValidator';
import { testValidator } from './validatorTestUtils';

describe('OneOfValidator', () => {
  let validator:OneOfValidator;
  const customErrorMessage = 'customErrorMessage';
  const INVALID_VALUE = 'invalid';

  beforeEach(() => {
    validator = new OneOfValidator({ value: ['one', 'two'] });
  });

  describe('Instance should be correct validator', () => {
    const validator = new OneOfValidator({ value: ['one', 'two'] });
    testValidator(validator);
  });

  it('Should return default error message, if no custom message provided in constructor', () => {
    const errorMessage = validator.validate(INVALID_VALUE);

    expect(errorMessage).toBe(`Field value should be one of ${['one', 'two'].toString()}`);
  });
  it('Should return error message, if input data invalid', () => {
    validator = new OneOfValidator({ message: customErrorMessage, value: ['one', 'two'] });

    const errorMessage = validator.validate(INVALID_VALUE);

    expect(errorMessage).toBe(customErrorMessage);
  });
  it('Should return empty string, if value is valid', () => {
    const errorMessage = validator.validate('one');

    expect(errorMessage).toBe('');
  });
});
