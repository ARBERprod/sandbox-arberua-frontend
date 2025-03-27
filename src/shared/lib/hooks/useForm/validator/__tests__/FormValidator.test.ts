import { HasNumberValidator, MinLengthValidator, SameWithValidator } from '@/shared/lib/hooks/useForm';
import { FormField } from '@/shared/lib/hooks/useForm/FormField';
import { RequiredValidator } from '../validators/RequiredValidator';
import {
  fieldPaths, formStateInvalid, formStateValid, fullValidatorConfig, getCustomMessage,
} from './__mock/FormValidatorData';
import { FormValidator } from '../FormValidator';

describe('FormValidator', () => {
  it('Should create correct config', () => {
    const formValidator = new FormValidator(fullValidatorConfig);
    expect(formValidator.getConfig()).toEqual(fullValidatorConfig);
  });

  describe('Config appending', () => {
    let formValidator: FormValidator<any>;

    beforeEach(() => {
      formValidator = new FormValidator({
        name: [new RequiredValidator()],
      });
    });

    it('Should append new config', () => {
      formValidator.appendConfig('email', [new RequiredValidator()]);

      expect(formValidator.getConfig()).toEqual({
        name: [new RequiredValidator()],
        email: [new RequiredValidator()],
      });
    });

    it('Should append new nested config', () => {
      formValidator.appendConfig('user.info.email', [new RequiredValidator()]);

      expect(formValidator.getConfig()).toEqual({
        name: [new RequiredValidator()],
        user: {
          info: {
            email: [new RequiredValidator()],
          },
        },
      });
    });

    it('Should append new config as array element', () => {
      formValidator.appendConfig('skills.0', [new RequiredValidator()]);

      expect(formValidator.getConfig()).toEqual({
        name: [new RequiredValidator()],
        skills: [
          [new RequiredValidator()],
        ],
      });
    });

    it('Should append new config in nested array structure', () => {
      formValidator.appendConfig('user.skills.0.level', [new RequiredValidator()]);

      expect(formValidator.getConfig()).toEqual({
        name: [new RequiredValidator()],
        user: {
          skills: [
            {
              level: [new RequiredValidator()],
            },
          ],
        },
      });
    });
  });

  describe('Config reducing', () => {
    it('Should remove part of config', () => {
      const formValidator = new FormValidator({
        name: [new RequiredValidator()],
        email: [new RequiredValidator()],
      });

      formValidator.removeConfig('email');

      expect(formValidator.getConfig()).toEqual({
        name: [new RequiredValidator()],
      });
    });

    it('Should remove config in nested structure', () => {
      const formValidator = new FormValidator({
        user: {
          info: [new RequiredValidator()],
          email: [new RequiredValidator()],
        },
      });

      formValidator.removeConfig('user.email');

      expect(formValidator.getConfig()).toEqual({
        user: {
          info: [new RequiredValidator()],
        },
      });
    });

    it('Should remove array element config', () => {
      const formValidator = new FormValidator({
        skills: [
          new RequiredValidator(),
          new MinLengthValidator({ value: 8 }),
          new HasNumberValidator(),
        ],
      });

      formValidator.removeConfig('skills.1');

      expect({
        skills: [
          new RequiredValidator(),
          new HasNumberValidator(),
        ],
      });
    });

    it('Should remove array element in nested structure', () => {
      const formValidator = new FormValidator({
        skills: [
          {
            level: [new RequiredValidator()],
          },
          {
            level: [new HasNumberValidator()],
          },
          {
            level: [new MinLengthValidator({ value: 8 })],
          },
        ],
      });

      formValidator.removeConfig('skills.1.level');

      expect(formValidator.getConfig()).toEqual({
        skills: [
          {
            level: [new RequiredValidator()],
          },
          {},
          {
            level: [new MinLengthValidator({ value: 8 })],
          },
        ],
      });
    });

    it('Should remove nested part of config', () => {
      const formValidator = new FormValidator({
        name: [new RequiredValidator()],
        user: {
          info: {
            email: [new RequiredValidator()],
          },
        },
      });

      formValidator.removeConfig('user');

      expect(formValidator.getConfig()).toEqual({
        name: [new RequiredValidator()],
      });
    });
  });

  describe('Form field validation', () => {
    it('Should return field error', () => {
      const validatorConfig = new FormValidator({
        name: [new RequiredValidator()],
      });

      const formState = {
        name: new FormField('', ''),
      };

      const errorMessage = validatorConfig.getFieldError(formState, 'name');
      expect(errorMessage).not.toBe('');
    });

    it('Should return custom field error message', () => {
      const customMessage = getCustomMessage('name');
      const validatorConfig = new FormValidator({
        name: [new RequiredValidator({ message: customMessage })],
      });

      const formState = {
        name: new FormField('', ''),
      };

      const errorMessage = validatorConfig.getFieldError(formState, 'name');
      expect(errorMessage).toBe(customMessage);
    });

    it('Should return empty string, if data is valid', () => {
      const validatorConfig = new FormValidator({
        name: [new RequiredValidator()],
      });

      const formState = {
        name: new FormField('value', ''),
      };

      const errorMessage = validatorConfig.getFieldError(formState, 'name');
      expect(errorMessage).toBe('');
    });

    it('Should return empty string, if validator not provides required, and value not filled', () => {
      const validatorConfig = new FormValidator({
        password: [new HasNumberValidator({ message: '' })],
      });

      const formState = {
        password: new FormField('', ''),
      };

      const errorMessage = validatorConfig.getFieldError(formState, 'password');
      expect(errorMessage).toBe('');
    });

    it('Should return error message, if validator not provides required, and value is not valid', () => {
      const validatorConfig = new FormValidator({
        password: [new HasNumberValidator({ message: '' })],
      });

      const formState = {
        password: new FormField('value', ''),
      };

      const errorMessage = validatorConfig.getFieldError(formState, 'password');
      expect(errorMessage).not.toBe('');
    });

    it('Should return error message, if validator not provides required, and value is valid', () => {
      const validatorConfig = new FormValidator({
        password: [new HasNumberValidator({ message: '' })],
      });

      const formState = {
        password: new FormField('value2', ''),
      };

      const errorMessage = validatorConfig.getFieldError(formState, 'password');
      expect(errorMessage).toBe('');
    });

    it('Should return error message, if validator not provides required, and value is valid', () => {
      const validatorConfig = new FormValidator({
        password: [new HasNumberValidator({ message: '' })],
      });

      const formState = {
        password: new FormField('value2', ''),
      };

      const errorMessage = validatorConfig.getFieldError(formState, 'password');
      expect(errorMessage).toBe('');
    });

    it('Should return error message, if target validator passed, and value is not valid', () => {
      const validatorConfig = new FormValidator({
        password: [new RequiredValidator()],
        passwordConfirmation: [new SameWithValidator({ target: 'password' })],
      });

      const formState = {
        password: new FormField('value2', ''),
        passwordConfirmation: new FormField('value', ''),
      };

      const errorMessage = validatorConfig.getFieldError(formState, 'passwordConfirmation');
      expect(errorMessage).not.toBe('');
    });

    it('Should return error message, if target validator passed, and value is valid', () => {
      const validatorConfig = new FormValidator({
        password: [new RequiredValidator()],
        passwordConfirmation: [new SameWithValidator({ target: 'password' })],
      });

      const formState = {
        password: new FormField('value2', ''),
        passwordConfirmation: new FormField('value2', ''),
      };

      const errorMessage = validatorConfig.getFieldError(formState, 'passwordConfirmation');
      expect(errorMessage).toBe('');
    });
  });

  describe('Form state validation', () => {
    it('Should return empty object, if formState is valid', () => {
      const formValidator = new FormValidator(fullValidatorConfig);
      expect(formValidator.getFormErrors(formStateValid, fieldPaths)).toEqual({});
    });

    it('Should return errors object, if formState is invalid', () => {
      const formValidator = new FormValidator(fullValidatorConfig);

      const expectedResult = {
        login: 'Field is required!',
        password: 'Cannot be less than 8 symbols',
        passwordConfirmation: 'Value should be same with password value',
        checkAge: 'Field is required if age equals 21',
        info: {
          languages: [
            'Cannot be less than 2 symbols',
            'Cannot be less than 2 symbols',
            'Cannot be less than 2 symbols',
          ],
          address: {
            city: 'Field is required when info.enabled is not empty',
            skills: [
              {
                title: 'Cannot be less than 3 symbols',
                level: 'Cannot be less than 3 symbols',
              },
            ],
          },
        },
      };
      const errors = formValidator.getFormErrors(formStateInvalid, fieldPaths);
      expect(errors).toEqual(expectedResult);
    });
  });
});
