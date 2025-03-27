import { FilterUtils } from '../filterUtils';

describe('filterUtils', () => {
  describe('getFilterStringFromQueryArray', () => {
    it('Should return correct string from query array', () => {
      const PARAM = ['colors=red;brown', 'sizes=xl', 'page=1', 'sort=popular'];
      const RESULT = 'colors=red,brown&sizes=xl&page=1&sort=popular';

      expect(FilterUtils.getFilterStringFromQueryArray(PARAM)).toBe(RESULT);
    });

    it('Should return empty string if no param passed', () => {
      expect(FilterUtils.getFilterStringFromQueryArray()).toBe('');
    });
  });
});
