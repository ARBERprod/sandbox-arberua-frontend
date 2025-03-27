import { memo } from 'react';
import cn from 'classnames';
import { FaqTabAccordionItem } from '../FaqTabAccordionItem';
import { FaqTab } from '../../model/types/types';
import styles from './FaqSectionMobile.module.scss';

interface FaqSectionMobileProps {
  className?: string;
  tabs: FaqTab[];
}

export const FaqSectionMobile = memo(({
  className,
  tabs = [],
}:FaqSectionMobileProps) => {
  if (!tabs.length) {
    return null;
  }

  return (
    <div className={cn(styles.root, className)}>
      {tabs.map((tab, index) => (
        // eslint-disable-next-line
        <div className={styles.item} key={index}>
          <FaqTabAccordionItem tab={tab} />
        </div>
      ))}
    </div>
  );
});
