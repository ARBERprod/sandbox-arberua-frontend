import { memo } from 'react';
import cn from 'classnames';
import { FaqTabSingle } from '../FaqTabSingle';
import { FaqTab } from '../../model/types/types';
import styles from './FaqTabList.module.scss';

interface FaqTabListProps {
  className?: string;
  items: FaqTab[];
  currentTab: string | null;
  onClick: (id: string) => void;
}

export const FaqTabList = memo(({
  className,
  items = [],
  currentTab,
  onClick,
}:FaqTabListProps) => {
  if (!items.length) {
    return null;
  }

  return (
    <ul className={cn(styles.root, className)}>
      {items.map((item: FaqTab) => (
        <li key={item.id} className={styles.item}>
          <FaqTabSingle
            id={item.id}
            title={item.title}
            icon={item.picture}
            currentTab={currentTab}
            onClick={onClick}
          />
        </li>
      ))}
    </ul>
  );
});
