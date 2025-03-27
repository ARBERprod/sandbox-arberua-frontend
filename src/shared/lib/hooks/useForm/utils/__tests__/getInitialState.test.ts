import { FormField } from '../../FormField';
import { getInitialState } from '../getInitialState';

describe('getInitialState', () => {
  it('Should return correct paths and init value, if passed simple one level object', () => {
    const initData = {
      name: 'some default name',
      email: 'default email',
    };

    const result = {
      fieldPaths: ['name', 'email'],
      initState: {
        name: new FormField('some default name', 'name'),
        email: new FormField('default email', 'email'),
      },
    };

    expect(getInitialState(initData)).toEqual(result);
  });

  it('Should return correct paths and init value, if passed simple one level object with default number value', () => {
    const initData = {
      name: 'some default name',
      age: 5,
    };

    const result = {
      fieldPaths: ['name', 'age'],
      initState: {
        name: new FormField('some default name', 'name'),
        age: new FormField(5, 'age'),
      },
    };

    expect(getInitialState(initData)).toEqual(result);
  });

  it('Should return correct paths and init value, if passed simple one level object with empty values', () => {
    const initData = {
      name: '',
      email: '',
    };

    const result = {
      fieldPaths: ['name', 'email'],
      initState: {
        name: new FormField('', 'name'),
        email: new FormField('', 'email'),
      },
    };

    expect(getInitialState(initData)).toEqual(result);
  });

  it('Should return correct nested object structure', () => {
    const initData = {
      name: '',
      address: {
        city: '',
        country: '',
        zip: {
          id: '',
          value: '',
        },
      },
    };

    const expectedResult = {
      fieldPaths: ['name', 'address.city', 'address.country', 'address.zip.id', 'address.zip.value'],
      initState: {
        name: new FormField('', 'name'),
        address: {
          city: new FormField('', 'address.city'),
          country: new FormField('', 'address.country'),
          zip: {
            id: new FormField('', 'address.zip.id'),
            value: new FormField('', 'address.zip.value'),
          },
        },
      },
    };

    expect(getInitialState(initData)).toEqual(expectedResult);
  });

  it('Should turn array of values to form field objects', () => {
    const initData = {
      name: '',
      skills: ['html', 'css', 'js'],
    };

    const expectedValue = {
      fieldPaths: ['name', 'skills.0', 'skills.1', 'skills.2'],
      initState: {
        name: new FormField('', 'name'),
        skills: [
          new FormField('html', 'skills.0'),
          new FormField('css', 'skills.1'),
          new FormField('js', 'skills.2'),
        ],
      },
    };

    expect(getInitialState(initData)).toEqual(expectedValue);
  });

  it('Should return correct nested objects in array', () => {
    const initData = {
      skills: [
        {
          id: '1',
          value: 'html',
        },
      ],
    };

    const expectedResult = {
      fieldPaths: ['skills.0.id', 'skills.0.value'],
      initState: {
        skills: [
          {
            id: new FormField('1', 'skills.0.id'),
            value: new FormField('html', 'skills.0.value'),
          },
        ],
      },
    };

    expect(getInitialState(initData)).toEqual(expectedResult);
  });
});
