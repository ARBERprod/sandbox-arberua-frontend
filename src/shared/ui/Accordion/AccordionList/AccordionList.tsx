import { memo, ReactElement } from 'react';
import cn from 'classnames';
import styles from './AccordionList.module.scss';
import { AccordionItem, IAccordionItem } from '../AccordionItem/AccordionItem';

type AccordionListProps = {
  className?: string;
  items?: IAccordionItem[];
  children?: never;
} |
  {
    className?: string;
    items?: never;
    children?: ReactElement;
  }

export const AccordionList = memo(({ items, children, className }:AccordionListProps) => {
  if (!children && !items) return null;

  if (children) {
    return (
      <ul className={cn(styles.root, className)}>
        {children}
      </ul>
    );
  }

  if (!items || items.length === 0) return null;

  return (
    <ul className={cn(styles.root, className)}>
      {items.map((item) => (
        <li key={item.title}>
          <AccordionItem title={item.title} content={item.content} />
        </li>
      ))}
    </ul>
  );
});
