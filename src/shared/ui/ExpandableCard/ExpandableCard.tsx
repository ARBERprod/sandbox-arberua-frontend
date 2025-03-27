import { ReactNode } from 'react';
import cn from 'classnames';
import ChevronDownIcon from '@/shared/assets/icons/arrow-down.svg';
import ChevronUpIcon from '@/shared/assets/icons/arrow-up.svg';
import { useAccordion } from '@/shared/lib/hooks/useAccordion';
import { Svg } from '@/shared/ui/Svg';
import styles from './ExpandableCard.module.scss';

interface ExpandableCardProps {
  className?: string;
  children: ReactNode;
  expandContent?: ReactNode;
}

export const ExpandableCard = ({ expandContent, children, className }:ExpandableCardProps) => {
  const { ref, toggle, isVisible } = useAccordion<HTMLDivElement>();
  return (
    <div className={cn(styles.root, { [styles.expanded]: isVisible }, className)}>
      {expandContent
        && (
          <button onClick={toggle} className={styles.btn}>
            <Svg width={10} height={6} Icon={isVisible ? ChevronUpIcon : ChevronDownIcon} />
          </button>
        )}
      {children}
      {expandContent
      && (
        <div ref={ref}>
          <div className={styles.expandedContent}>
            {expandContent}
          </div>
        </div>
      )}
    </div>
  );
};
