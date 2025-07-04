import { memo } from 'react';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import { Container } from '@/shared/ui/Container';
import { Typography } from '@/shared/ui/Typography';
import { PromotionsGrid, useGetPromotionsQuery } from '@/entities/Promotion';
import { Loader } from '@/shared/ui/Loader';

import styles from './PromotionsView.module.scss';

interface PromotionsViewProps {
  className?: string;
}

export const PromotionsView = memo(({ className }:PromotionsViewProps) => {
  const { t } = useTranslation();
  const { data, isLoading, isError } = useGetPromotionsQuery();
  if (isLoading) return <Loader className={styles.loader} />;
  if (isError || !data) return null;

  return (
    <div className={cn(styles.root, className)}>
      <Container>
        <Typography variant="title-1" centered>{t('heading.promotions-title')}</Typography>
        <PromotionsGrid className="mt-6" promotions={data?.data} />
      </Container>
    </div>
  );
});
