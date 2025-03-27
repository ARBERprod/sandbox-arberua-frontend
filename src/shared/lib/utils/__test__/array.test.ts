import { lastElement } from '@/shared/lib/utils/array';

describe('Array helpers', () => {
  describe('Last element', () => {
    it('Should return last element of an array', () => {
      const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      expect(lastElement(array)).toBe(9);
    });

    it('Should return undefined, if array is empty', () => {
      expect(lastElement([])).toBe(undefined);
    });
  });
});
