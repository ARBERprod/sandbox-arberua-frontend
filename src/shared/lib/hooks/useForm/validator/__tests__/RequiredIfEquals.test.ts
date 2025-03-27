import { RequiredIfEquals } from '../validators/RequiredIfEquals';
import { testTargetValidator } from './validatorTestUtils';

describe('RequiredIfEquals', () => {
  let validator:RequiredIfEquals;
  const customErrorMessage = 'customErrorMessage';
  const INVALID_VALUE = '';
  const TARGET_VALUE = 'hello world';
  const VALID_VALUE = 'valid value';

  beforeEach(() => {
    validator = new RequiredIfEquals({ value: TARGET_VALUE, target: 'name' });
  });

  describe('Instance should be correct validator', () => {
    const validator = new RequiredIfEquals({ value: TARGET_VALUE, target: 'name' });
    testTargetValidator(validator);
  });

  it('Should return default error message, if no custom message provided in constructor', () => {
    const errorMessage = validator.validate(INVALID_VALUE, TARGET_VALUE);

    expect(errorMessage).toBe(`Field is required if name equals ${TARGET_VALUE}`);
  });
  it('Should return error message, if input data invalid', () => {
    validator = new RequiredIfEquals({ message: customErrorMessage, value: TARGET_VALUE, target: 'name' });

    const errorMessage = validator.validate(INVALID_VALUE, TARGET_VALUE);

    expect(errorMessage).toBe(customErrorMessage);
  });
  it('Should return empty string, if value is valid', () => {
    const errorMessage = validator.validate(VALID_VALUE, TARGET_VALUE);

    expect(errorMessage).toBe('');
  });
  it('Should return empty string, if no target value', () => {
    const errorMessage = validator.validate('', 'fkjdshgfkjsdhgf');

    expect(errorMessage).toBe('');
  });
});
