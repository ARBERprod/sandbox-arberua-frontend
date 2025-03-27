import { memo } from 'react';
import cn from 'classnames';
import EmptyCartIcon from '@/shared/assets/icons/empty-cart.svg';
import { Svg } from '@/shared/ui/Svg';
import { Typography } from '@/shared/ui/Typography';
import { useTranslation } from 'next-i18next';
import styles from './EmptyCartBody.module.scss';

interface EmptyCartBodyProps {
  className?: string;
}

export const EmptyCartBody = memo(({ className }:EmptyCartBodyProps) => {
  const { t } = useTranslation();
  return (
    <div className={cn(styles.root, className)}>
      <Svg Icon={EmptyCartIcon} width="50%" height="auto" />
      <Typography centered variant="title-4" className="mt-8">{t('cart.text')}</Typography>
      <Typography className={styles.text} centered variant="body-2">{t('cart.text1')}</Typography>
    </div>
  );
});
