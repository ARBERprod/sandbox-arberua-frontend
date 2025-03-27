import { filtersManager } from '@/shared/lib/hooks/useFilterUrlUpdate/FiltersManager';

const FILTERS = ['producer=add;annarita-n;castaner;emporio-armani', 'rozmiri=xs;s;m'];
const CATEGORY = 'odiag';
const SLUG = 'some-slug';

describe('FiltersManager', () => {
  describe('getBasePath', () => {
    describe('when no dynamic keys', () => {
      it('should return base path without dynamic keys', () => {
        const pathname = '/page';

        expect(filtersManager.getBasePath({}, pathname)).toBe('/page');
      });
      it('should return base path without dynamic keys, with filters', () => {
        const pathname = '/page/[...filters]';
        const query = {
          filters: FILTERS,
        };

        expect(filtersManager.getBasePath(query, pathname)).toBe('/page');
      });
    });
    describe('when none dynamic key', () => {
      it('should return base path with one dynamic key', () => {
        const pathname = '/page/[category]';
        const query = {
          category: CATEGORY,
        };

        expect(filtersManager.getBasePath(query, pathname)).toBe(`/page/${CATEGORY}`);
      });
      it('should return base path with one dynamic key with filters', () => {
        const pathname = '/page/[category]/[...filters]';
        const query = {
          category: CATEGORY,
          filters: FILTERS,
        };
        expect(filtersManager.getBasePath(query, pathname)).toBe(`/page/${CATEGORY}`);
      });
    });
    describe('when many dynamic keys', () => {
      it('should return base path with many dynamic keys', () => {
        const pathname = '/page/[category]/[slug]';
        const query = {
          category: CATEGORY,
          slug: SLUG,
        };
        expect(filtersManager.getBasePath(query, pathname)).toBe(`/page/${CATEGORY}/${SLUG}`);
      });
      it('should return base path with many dynamic keys with filters', () => {
        const pathname = '/page/[category]/[slug]/[...filters]';
        const query = {
          category: CATEGORY,
          slug: SLUG,
          filters: FILTERS,
        };
        expect(filtersManager.getBasePath(query, pathname)).toBe(`/page/${CATEGORY}/${SLUG}`);
      });
    });
  });
});
