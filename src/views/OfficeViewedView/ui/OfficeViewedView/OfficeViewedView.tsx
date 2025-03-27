import { memo } from 'react';
import cn from 'classnames';
import { OfficeProductsGrid, ViewedProductCard } from '@/widgets/ProductPresenter';
import { Button } from '@/shared/ui/Button';
import { Typography } from '@/shared/ui/Typography';
import { Flex } from '@/shared/ui/Flex';
import { useTranslation } from 'next-i18next';
import { useConfirmModal } from '@/shared/lib/components/ConfirmModalProvider';
import { useClearProductsHistoryMutation, useGetHistoryProductsQuery } from '@/entities/Product';
import styles from './OfficeViewedView.module.scss';
import { ErrorMessage } from '@/shared/ui/Form/ErrorMessage';
import { Loader, PageLoader } from '@/shared/ui/Loader';

interface OfficeViewedProps {
  className?: string;
}

export const OfficeViewedView = memo(({ className }:OfficeViewedProps) => {
  const { data: products, isLoading, isError } = useGetHistoryProductsQuery();
  const [clearViewedProducts, { isLoading: clearHistoryLoading }] = useClearProductsHistoryMutation();
  const { t } = useTranslation('office-page');
  const { withConfirm } = useConfirmModal();
  const onClearAlHandler = withConfirm({
    onAccept: () => {
      clearViewedProducts();
    },
    content: t('clear_viewed_confirm'),
  });

  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.header}>
        <Flex justify="between" align="center">
          <Typography variant="title-4">{t('viewed_goods')}</Typography>
          <Button
            onClick={onClearAlHandler}
            color="light-secondary"
            size="mediumlarge"
            className={styles.button}
          >
            {t('clear_viewed')}
          </Button>
        </Flex>
      </div>
      {clearHistoryLoading && <PageLoader />}
      {isLoading && <Loader centered />}
      {isError && <ErrorMessage error="Error" />}
      {products
      && (
        <OfficeProductsGrid
          products={products}
          ProductCard={ViewedProductCard}
        />
      )}
    </div>
  );
});
