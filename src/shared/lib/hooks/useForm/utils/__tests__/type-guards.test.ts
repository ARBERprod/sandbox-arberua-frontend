import { isField } from '../type-guards';
import { FormField } from '../../FormField';

describe('type-guards', () => {
  describe('isField', () => {
    it('Should return true, if passed field like object', () => {
      const formField = new FormField('213', '123');
      expect(isField(formField)).toBe(true);
    });

    it('Should return false, if passed primitive', () => {
      expect(isField(1)).toBe(false);
      expect(isField('fdsf')).toBe(false);
      expect(isField(false)).toBe(false);
      expect(isField(true)).toBe(false);
    });

    it('Should return false, if passed null|undefined', () => {
      expect(isField(null)).toBe(false);
      expect(isField(undefined)).toBe(false);
    });

    it('Should return false, if passed array', () => {
      expect(isField([])).toBe(false);
    });

    it('Should return false, if passed non field like object', () => {
      expect(isField({ prop: 'value' })).toBe(false);
    });
  });
});
