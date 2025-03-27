import { memo } from 'react';
import { Typography } from '@/shared/ui/Typography';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import styles from '../ProductDetails.module.scss';
import { Price } from '@/shared/types/common';

interface BonusesProps {
    className?: string;
    canWriteOff?: number | null;
    price?: Price | false;
}

export const Bonuses = memo(({
  canWriteOff, className, price,
}: BonusesProps) => {
  const { t } = useTranslation();

  const itemPrice = (price && price.value) || 0;
  const itemCashback = '10%';
  const canWriteOffCalculated = Math.floor(((itemPrice) / 100) * (canWriteOff || 0));

  return (
    <div className={cn(styles.priceAdditional, className)}>
      {!!canWriteOffCalculated && (
        <Typography variant="body-3">
          <span className={styles.fw500}>
            {t('bonuses.can-written-off')}
            :
          </span>
          {' '}
          {canWriteOffCalculated}
          {' '}
          {t('office.hrn')}
        </Typography>
      )}
      {
        itemCashback && (
          <Typography variant="body-3">
            <span className={styles.fw500}>
              {t('bonuses.cashback-to.text')}
              :
            </span>
            {' '}
            {itemCashback}
          </Typography>
        )
      }
    </div>
  );
});
