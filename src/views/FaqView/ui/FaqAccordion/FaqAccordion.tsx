import { memo } from 'react';
import cn from 'classnames';
import { FaqAccordionItem } from '../FaqAccordionItem';
import styles from './FaqAccordion.module.scss';
import { Faq } from '../../model/types/types';

interface FaqAccordionProps {
  className?: string;
  items: Faq[] | null;
}

export const FaqAccordion = memo(({
  className,
  items,
}:FaqAccordionProps) => {
  if (items === null) {
    return null;
  }

  return (
    <div className={cn(styles.root, className)}>
      {items.map((item) => (
        <FaqAccordionItem item={item} key={item.id} />
      ))}
    </div>
  );
});
