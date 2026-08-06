import { MenuLink } from '../model/types';

/**
 * Puts `inserted` right after the item with the given `url`. The anchor is matched by url and not
 * by index, because the static menu keeps changing; a menu without the anchor still shows the
 * inserted items — appended at the end rather than dropped.
 */
export const insertAfterUrl = (items: MenuLink[], url: string, inserted: MenuLink[]): MenuLink[] => {
  if (!inserted.length) return items;

  const anchorIndex = items.findIndex((item) => item.url === url);
  if (anchorIndex === -1) return [...items, ...inserted];

  return [
    ...items.slice(0, anchorIndex + 1),
    ...inserted,
    ...items.slice(anchorIndex + 1),
  ];
};
