import { memo, useMemo } from 'react';
import cn from 'classnames';
import { HeaderMenuItem } from '../HeaderMenuItem';
import { CurrentMenuType, MenuLink, MenuLinkView } from '../../../model/types';
import styles from './HeaderMenuListItems.module.scss';
import { useHeaderMenu } from '../HeaderMenuProvider';

interface HeaderMenuListItemsProps {
  className?: string;
  items: MenuLink[] | false;
  isNested?: boolean;
  onClick?: (type: CurrentMenuType) => void;
}

export const HeaderMenuListItems = memo(({
  className,
  items = [],
  isNested,
  onClick,
}: HeaderMenuListItemsProps) => {
  const { isHovered } = useHeaderMenu();
  const sortedItems = useMemo(() => {
    if (!items) return [];

    const noveltyItems: MenuLink[] = [];
    const regularItems: MenuLink[] = [];

    items.forEach((item) => {
      if (item?.slug?.includes('novelty')) {
        noveltyItems.push(item);
      } else {
        regularItems.push(item);
      }
    });

    return [...noveltyItems, ...regularItems];
  }, [items]);

  if (!items || !items.length) {
    return null;
  }

  return (
    <ul className={
      cn(
        styles.root,
        {
          [styles.nested]: isNested,
        },
        className,
      )
    }
    >
      { sortedItems && sortedItems.map((item) => {
        let type = 'link';
        if (item.button) {
          type = 'button';
        } else if (item.children) {
          type = 'accordion';
        }
        const finalHref = item.url || item.href;

        return (
          <HeaderMenuItem
            key={item.id ?? item.title}
            href={finalHref}
            onClick={onClick}
            type={type as MenuLinkView}
            nested={item.children}
            isNested={isNested}
            openNewPage={item.openNewPage}
            color={item.color}
            bold={item.bold}
            targetMenu={item.button}
            isHovered={isHovered}
          >
            {item.title}
          </HeaderMenuItem>
        );
      })}
    </ul>
  );
});
