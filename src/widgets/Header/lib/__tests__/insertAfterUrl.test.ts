import type { MenuLink } from '../../model/types';
import { insertAfterUrl } from '../insertAfterUrl';

const link = (title: string, url?: string): MenuLink => ({
  title,
  url,
  children: false,
  button: false,
});

const titles = (items: MenuLink[]) => items.map((item) => item.title);

const staticMenu = (): MenuLink[] => [
  link('New Arrivals', '/new-arrivals'),
  link('Catalog', ''),
  link('Collections', '/collections'),
  link('Sale', '/sale'),
];

describe('insertAfterUrl', () => {
  it('returns the original list untouched when there is nothing to insert', () => {
    const items = staticMenu();

    const result = insertAfterUrl(items, '/collections', []);

    expect(result).toBe(items);
  });

  it('puts several items right after the anchor, keeping their order', () => {
    const inserted = [
      link('ARBER × One', '/collaboration/1'),
      link('ARBER × Two', '/collaboration/2'),
    ];

    const result = insertAfterUrl(staticMenu(), '/collections', inserted);

    expect(titles(result)).toEqual([
      'New Arrivals',
      'Catalog',
      'Collections',
      'ARBER × One',
      'ARBER × Two',
      'Sale',
    ]);
  });

  it('appends to the end when the anchor is missing rather than dropping the items', () => {
    const menuWithoutAnchor = [link('New Arrivals', '/new-arrivals'), link('Sale', '/sale')];

    const result = insertAfterUrl(menuWithoutAnchor, '/collections', [link('ARBER × One', '/collaboration/1')]);

    expect(titles(result)).toEqual(['New Arrivals', 'Sale', 'ARBER × One']);
  });

  it('appends to the end of an empty list', () => {
    const result = insertAfterUrl([], '/collections', [link('ARBER × One', '/collaboration/1')]);

    expect(titles(result)).toEqual(['ARBER × One']);
  });

  it('inserts after the first anchor match only', () => {
    const items = [
      link('Collections', '/collections'),
      link('Collections (dup)', '/collections'),
    ];

    const result = insertAfterUrl(items, '/collections', [link('ARBER × One', '/collaboration/1')]);

    expect(titles(result)).toEqual(['Collections', 'ARBER × One', 'Collections (dup)']);
  });

  // The menu is rebuilt by a memo on every render: mutating the source array would leak the
  // inserted items into the next build and duplicate them.
  it('leaves both input arrays alone', () => {
    const items = staticMenu();
    const inserted = [link('ARBER × One', '/collaboration/1')];

    insertAfterUrl(items, '/collections', inserted);

    expect(titles(items)).toEqual(['New Arrivals', 'Catalog', 'Collections', 'Sale']);
    expect(titles(inserted)).toEqual(['ARBER × One']);
  });
});
