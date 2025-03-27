import { memo } from 'react';
import cn from 'classnames';
import { Breadcrumps } from '@/shared/ui/Breadcrumps';
import { Typography } from '@/shared/ui/Typography';
import { Flex } from '@/shared/ui/Flex';
import { useTranslation } from 'next-i18next';
import {
  BonusesBannerSection,
  BonusesChatbotSection,
  BonusesHowitworksSection,
  BonusesHowtogetSection,
  BonusesReasonsSection,
} from '../sections';
import styles from './BonusesView.module.scss';

interface BonusesViewProps {
  className?: string;
}

export const BonusesView = memo(({ className }:BonusesViewProps) => {
  const { t } = useTranslation();
  return (
    <div className={cn(styles.root, className)}>
      <Flex justify="center">
        <Breadcrumps className={styles.bc}>
          <Typography variant="body-2">{t('main')}</Typography>
          <Typography variant="body-2" color="black">{t('menu.loyalty-program')}</Typography>
        </Breadcrumps>
      </Flex>
      <BonusesBannerSection />
      <BonusesHowitworksSection />
      <BonusesReasonsSection />
      <BonusesHowtogetSection />
      <BonusesChatbotSection />
    </div>
  );
});
