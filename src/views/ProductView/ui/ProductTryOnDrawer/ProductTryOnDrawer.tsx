import { memo, lazy, Suspense } from 'react';
import cn from 'classnames';
import { Drawer } from '@/shared/ui/Drawer';
import { Typography } from '@/shared/ui/Typography';
import { useTranslation } from 'next-i18next';
import { SizeGridButton } from '@/features/ShowSizeGrid';
import styles from './ProductTryOnDrawer.module.scss';
import { useProductSkus } from '@/views/ProductView/lib/ProductSkusContext';
import { Loader } from '@/shared/ui/Loader';

const BookProductForm = lazy(() => import('@/features/BookProduct').then((module) => ({ default: module.BookProductForm })));

interface ProductTryOnDrawerProps {
  className?: string;
  isOpen: boolean;
  productId: string;
  onClose: () => void;
}

export const ProductTryOnDrawer = memo(({
  className,
  isOpen,
  onClose,
  productId,
}:ProductTryOnDrawerProps) => {
  const { t } = useTranslation();
  const { productSkus, chosenSku } = useProductSkus();

  const onSuccess = () => {
    onClose();
  };

  return (
    <Drawer onClose={onClose} isOpen={isOpen} withCloseButton anchor="right" className={cn(styles.root, className)}>
      <div className={styles.header}>
        <Typography variant="body-1" centered>{t('tryon.modal.title')}</Typography>
      </div>
      <div className={styles.body}>
        <Typography
          variant="body-2"
          className={styles.text}
          centered
        >
          {t('book_warning_2')}

        </Typography>
      </div>
      <div className={styles.actions}>
        <Suspense fallback={<Loader />}>
          {isOpen && (
            <BookProductForm
              productId={productId}
              skus={productSkus}
              chosenSkuId={chosenSku?.id || null}
              onSuccess={onSuccess}
              sizeGridSlot={<SizeGridButton variant="icon" />}
              type="clothe"
            />
          )}
        </Suspense>
      </div>
    </Drawer>
  );
});
