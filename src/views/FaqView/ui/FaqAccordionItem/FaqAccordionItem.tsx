import { memo } from 'react';
import { Typography } from '@/shared/ui/Typography';
import { Svg } from '@/shared/ui/Svg';
import { Flex } from '@/shared/ui/Flex';
import { useAccordion } from '@/shared/lib/hooks/useAccordion';
import ArrowUpIcon from '@/shared/assets/icons/arrow-up-2.svg';
import ArrowDownIcon from '@/shared/assets/icons/arrow-down-2.svg';
import cn from 'classnames';
import styles from './FaqAccordionItem.module.scss';
import { Faq } from '../../model/types/types';

interface FaqAccordionItemProps {
  className?: string;
  item: Faq;
}

export const FaqAccordionItem = memo(({
  className,
  item,
}:FaqAccordionItemProps) => {
  const { ref, toggle, isVisible } = useAccordion<HTMLDivElement>(false);

  return (
    <div className={cn(styles.root, className)}>
      <div
        className={styles.header}
        onClick={toggle}
        role="presentation"
      >
        <Flex justify="between">
          <Typography variant="body-2" className={styles.question}>{item.title}</Typography>
          <Svg
            Icon={isVisible
              ? ArrowUpIcon
              : ArrowDownIcon}
            className={styles.icon}
            width="24"
            height="24"
          />
        </Flex>
      </div>
      <div
        className={styles.content}
        ref={ref}
      >
        <Typography variant="body-3" className={styles.answer} dangerouslySetInnerHTML={{ __html: item.description }} />
      </div>
    </div>
  );
});
