import { memo } from 'react';
import cn from 'classnames';
import { Typography } from '@/shared/ui/Typography';
import { useTranslation } from 'next-i18next';
import styles from './BalanceInfo.module.scss';
import { useUserData } from '@/entities/Session';

interface BalanceInfoProps {
  className?: string;
}

export const BalanceInfo = memo(({ className }: BalanceInfoProps) => {
  const { t } = useTranslation('office-page');
  const { bonus_balance } = useUserData();

  return (
    <div className={cn(styles.root, className)}>
      <Typography variant="body-2" centered>
        {t('balance')}
        :
        {' '}
        <Typography as="span" variant="body-2" weight={500}>
          {t('bonus', { count: bonus_balance })}
        </Typography>
      </Typography>
    </div>
  );
});
