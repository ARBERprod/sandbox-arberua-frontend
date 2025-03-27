import { ReactNode } from 'react';
import cn from 'classnames';
import { CardView } from '@/shared/types/common';
import { typedMemo } from '@/shared/lib/utils/typedMemo';
import styles from './CardsGrid.module.scss';

type CardItem = { id: string };

interface CardsGridProps<Item extends CardItem> {
  className?: string;
  items: Item[];
  view: CardView;
  children: (item: Item) => ReactNode;
}

export const CardsGrid = typedMemo(
  <T extends CardItem>({
    items = [],
    view = CardView.NORMAL,
    className,
    children,
  }: CardsGridProps<T>) => (
    <div className={cn(styles.root, styles[view], className)}>
      {items.map(
        (item) => (
          <div
            className={styles.product}
            key={item.id}
          >
            {children(item)}
          </div>
        ),
      )}
    </div>
  ),
);
