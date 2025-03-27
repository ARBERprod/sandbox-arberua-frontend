import { FormState } from '../../types';
import { getFormData } from '../getFormData';
import { FormField } from '../../FormField';

describe('getFormData', () => {
  it('Should convert form state to form data', () => {
    const formState:FormState<any> = {
      name: new FormField('default name', 'name'),
      email: new FormField('email', 'email'),
    };

    const expectedResult = {
      name: 'default name',
      email: 'email',
    };
    expect(getFormData(formState)).toEqual(expectedResult);
  });

  it('Should convert form state with nested fields, to form data', () => {
    const formState:FormState<any> = {
      name: new FormField('', 'name'),
      address: {
        city: new FormField('', 'address.city'),
        zip: new FormField(5, 'address.zip'),
      },
    };

    const expectedResult = {
      name: '',
      address: {
        city: '',
        zip: 5,
      },
    };
    expect(getFormData(formState)).toEqual(expectedResult);
  });

  it('Should convert form state with array values to form data', () => {
    const formState:FormState<any> = {
      name: new FormField('', 'name'),
      skills: [
        new FormField('html', 'skills.0'),
        new FormField('css', 'skills.1'),
        new FormField('js', 'skills.2'),
      ],
    };

    const expectedValue = {
      name: '',
      skills: ['html', 'css', 'js'],
    };

    expect(getFormData(formState)).toEqual(expectedValue);
  });

  it('Should convert form state with array and nested objects to form data', () => {
    const formState:FormState<any> = {
      name: new FormField('', 'name'),
      skills: [
        {
          id: new FormField('123', 'skills.0.id'),
          value: new FormField('value', 'skills.0.value'),
        },
      ],
    };

    const expectedValue = {
      name: '',
      skills: [
        { id: '123', value: 'value' },
      ],
    };
    expect(getFormData(formState)).toEqual(expectedValue);
  });
});
