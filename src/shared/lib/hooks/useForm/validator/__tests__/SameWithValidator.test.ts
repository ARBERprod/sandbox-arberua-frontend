import { SameWithValidator } from '../validators/SameWithValidator';
import { testTargetValidator } from './validatorTestUtils';

describe('SameWithValidator', () => {
  let validator:SameWithValidator;
  const customErrorMessage = 'customErrorMessage';
  const INVALID_VALUE = 'invalid value';
  const VALID_VALUE = 'target value';
  const TARGET_VALUE = 'target value';
  const TARGET_NAME = 'name';

  beforeEach(() => {
    validator = new SameWithValidator({ target: TARGET_NAME });
  });

  describe('Instance should be correct validator', () => {
    const validator = new SameWithValidator({ target: TARGET_NAME });
    testTargetValidator(validator);
  });

  it('Should return default error message, if no custom message provided in constructor', () => {
    const errorMessage = validator.validate(INVALID_VALUE, TARGET_VALUE);

    expect(errorMessage).toBe(`Value should be same with ${TARGET_NAME} value`);
  });

  it('Should return error message, if input data invalid', () => {
    validator = new SameWithValidator({ message: customErrorMessage, target: TARGET_NAME });

    const errorMessage = validator.validate(INVALID_VALUE, TARGET_VALUE);

    expect(errorMessage).toBe(customErrorMessage);
  });

  it('Should return empty string, value matches with target value', () => {
    const errorMessage = validator.validate(VALID_VALUE, TARGET_VALUE);

    expect(errorMessage).toBe('');
  });
});
