import { RequiredWithValidator } from '../validators/RequiredWithValidator';
import { testTargetValidator } from './validatorTestUtils';

describe('RequiredWithValidator', () => {
  let validator:RequiredWithValidator;
  const customErrorMessage = 'customErrorMessage';
  const INVALID_VALUE = '';
  const VALID_VALUE = 'valid value';
  const TARGET_VALUE = 'targetvalue';
  const TARGET_NAME = 'name';

  beforeEach(() => {
    validator = new RequiredWithValidator({ target: TARGET_NAME });
  });

  describe('Instance should be correct validator', () => {
    const validator = new RequiredWithValidator({ target: TARGET_NAME });
    testTargetValidator(validator);
  });

  it('Should return default error message, if no custom message provided in constructor', () => {
    const errorMessage = validator.validate(INVALID_VALUE, TARGET_VALUE);

    expect(errorMessage).toBe(`Field is required when ${TARGET_NAME} is not empty`);
  });

  it('Should return error message, if input data invalid', () => {
    validator = new RequiredWithValidator({ message: customErrorMessage, target: TARGET_NAME });

    const errorMessage = validator.validate(INVALID_VALUE, TARGET_VALUE);

    expect(errorMessage).toBe(customErrorMessage);
  });

  it('Should return empty string, if no target value', () => {
    const errorMessage = validator.validate(INVALID_VALUE, '');

    expect(errorMessage).toBe('');
  });

  it('Should return empty string, if target value present, and passed valid value', () => {
    const errorMessage = validator.validate(VALID_VALUE, TARGET_VALUE);

    expect(errorMessage).toBe('');
  });
});
