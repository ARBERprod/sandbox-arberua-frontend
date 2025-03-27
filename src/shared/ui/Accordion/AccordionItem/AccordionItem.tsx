import { memo, ReactElement, ReactNode } from 'react';
import cn from 'classnames';
import { useAccordion } from '@/shared/lib/hooks/useAccordion';
import ChevronUp from '@/shared/assets/icons/arrow-up.svg';
import ChevronDown from '@/shared/assets/icons/arrow-down.svg';
import { Typography } from '@/shared/ui/Typography';
import { Svg } from '@/shared/ui/Svg';
import styles from './AccordionItem.module.scss';

export interface IAccordionItem {
  title: string;
  content: ReactElement | string;
}

type AccordionItemProps = {
  className?: string;
  title: string;
  content?: ReactElement | string;
  children?: never;
} | {
  className?: string;
  title: string;
  content?: never;
  children?: ReactNode;
}

export const AccordionItem = memo(({
  className, content, children, title,
}:AccordionItemProps) => {
  const { ref, toggle, isVisible } = useAccordion<HTMLDivElement>(false);

  const renderContent = () => {
    if (children) {
      return (
        <div className={styles.content}>{children}</div>
      );
    }
    if (typeof content === 'string') {
      return (
        <Typography as="div" variant="body-2" className={styles.content}>
          {content}
        </Typography>
      );
    }

    return <div className={styles.content}>{content}</div>;
  };
  return (
    <div className={cn(styles.root, className)}>
      <div onClick={toggle} className={styles.head} role="presentation">
        <Typography variant="body-2">{title}</Typography>
        <Svg Icon={isVisible ? ChevronUp : ChevronDown} width={10} height={5} />
      </div>
      <div ref={ref}>
        {renderContent()}
      </div>
    </div>
  );
});
