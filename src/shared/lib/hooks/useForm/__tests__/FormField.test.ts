import { FormField } from '../FormField';

describe('', () => {
  it('Should create form field with correct passed data', () => {
    const formField = new FormField('default value', 'path.to.field');

    expect(formField.value).toBe('default value');
    expect(formField.path).toBe('path.to.field');
    expect('_field' in formField).toBe(true);
    expect(formField._field).toBe(true);
  });
});
