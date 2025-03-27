import { memo } from 'react';
import cn from 'classnames';
import { useAccordion } from '@/shared/lib/hooks/useAccordion';
import { FaqTabSingle } from '../FaqTabSingle';
import { FaqAccordion } from '../FaqAccordion';
import { FaqTab } from '../../model/types/types';
import styles from './FaqTabAccordionItem.module.scss';

interface FaqTabAccordionItemProps {
  className?: string;
  tab: FaqTab;
}

export const FaqTabAccordionItem = memo(({
  className,
  tab,
}:FaqTabAccordionItemProps) => {
  const { ref, toggle, isVisible } = useAccordion<HTMLDivElement>(false);

  return (
    <div className={cn(styles.root, {
      [styles.active]: isVisible,
    }, className)}
    >
      <div
        className={styles.header}
        onClick={toggle}
        role="presentation"
      >
        <FaqTabSingle
          id={tab.id}
          icon={tab.picture}
          title={tab.title}
          isActive={isVisible}
        />
      </div>
      <div className={styles.content} ref={ref}>
        <FaqAccordion items={tab.contents} />
      </div>
    </div>
  );
});
