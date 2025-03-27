import { memo } from 'react';
import cn from 'classnames';
import { Bonus } from '@/entities/Bonus';
import { Flex, FlexCol } from '@/shared/ui/Flex';
import { ExpandableCard } from '@/shared/ui/ExpandableCard';
import { Typography } from '@/shared/ui/Typography';
import { useTranslation } from 'next-i18next';
import styles from './BonusList.module.scss';

interface BonusListProps {
  bonuses: Bonus[];
  className?: string;
}

export const BonusList = memo(({ className, bonuses = [] }:BonusListProps) => {
  const { t } = useTranslation();
  return (
    <FlexCol as="ul" gap="12" className={cn(styles.root, className)}>
      {bonuses.map((bonus) => (
        <li key={bonus.id}>
          <ExpandableCard>
            <FlexCol gap="12">
              <Flex gap="16">
                <Typography variant="body-3" weight={500}>
                  {t('office.date')}
                  :
                </Typography>
                <Typography variant="body-3">{bonus.created_at}</Typography>
              </Flex>
              <Flex gap="16">
                <Typography variant="body-3" weight={500}>
                  {t('office.name')}
                  :
                </Typography>
                <Typography variant="body-3">{bonus.content}</Typography>
              </Flex>
              <Flex gap="16">
                <Typography variant="body-3" weight={500}>
                  {t('office.accrued')}
                  :
                </Typography>
                <Typography variant="body-3">{bonus.type === 'earn' ? bonus.amount : bonus.amount * -1}</Typography>
              </Flex>
            </FlexCol>
          </ExpandableCard>
        </li>
      ))}
    </FlexCol>
  );
});
