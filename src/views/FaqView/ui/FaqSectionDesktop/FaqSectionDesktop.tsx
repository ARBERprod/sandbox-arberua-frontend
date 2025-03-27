import { memo } from 'react';
import cn from 'classnames';
import { Flex } from '@/shared/ui/Flex';
import { FaqAccordion } from '../FaqAccordion';
import { Faq, FaqTab } from '../../model/types/types';
import { FaqTabList } from '../FaqTabList';

import styles from './FaqSectionDesktop.module.scss';

interface FaqSectionDesktopProps {
  className?: string;
  currentTab: string | null;
  currentQuestions: Faq[] | null;
  tabs: FaqTab[];
  onClick: (id: string) => void;
}

export const FaqSectionDesktop = memo(({
  className,
  currentTab,
  currentQuestions,
  tabs,
  onClick,
}:FaqSectionDesktopProps) => (
  <div className={cn(styles.root, className)}>
    <FaqTabList
      items={tabs}
      currentTab={currentTab}
      onClick={onClick}
      className={styles.tablist}
    />
    <Flex justify="center">
      <FaqAccordion items={currentQuestions} className={styles.accordion} />
    </Flex>
  </div>
));
