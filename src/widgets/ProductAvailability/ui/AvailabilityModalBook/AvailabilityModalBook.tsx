import { memo } from 'react';
import cn from 'classnames';
import { BookProductForm } from '@/features/BookProduct';
import { Typography } from '@/shared/ui/Typography';
import { useTranslation } from 'next-i18next';
import { SizeGridButton } from '@/features/ShowSizeGrid';
import { MainModal } from '@/shared/ui/Modal';
import styles from './AvailabilityModalBook.module.scss';
import { useSelector } from 'react-redux';
import { useProductAvailabilityActions } from '../../model/productAvailabilitySlice';
import { productAvailabilitySelectors } from '../../model/productAvailabilitySelectors';
import { ProductSku } from '@/entities/Product';

interface AvailabilityModalBookProps {
  className?: string;
  skus: ProductSku[];
  chosenSkuId: string | null;
}

export const AvailabilityModalBook = memo(({
  className,
  skus = [],
  chosenSkuId,
}:AvailabilityModalBookProps) => {
  const { t } = useTranslation();
  const { closeModal, setActiveModal } = useProductAvailabilityActions();
  const productId = useSelector(productAvailabilitySelectors.getProductId);
  const isOpen = useSelector(productAvailabilitySelectors.getIsModalOpenByType('booking'));
  const closeHandler = () => {
    closeModal();
  };

  const backHandler = () => {
    setActiveModal({ type: 'product-availability' });
  };

  const onSuccess = () => {
    setActiveModal({ type: 'booking-success' });
  };

  return (
    <MainModal
      lazy
      title={t('book.product.modal.title')}
      withDivider
      width={530}
      centered
      unmountOnClose
      isOpen={isOpen}
      onClose={closeHandler}
      onBack={backHandler}
      withBackButton
      className={cn(styles.root, className)}
    >
      <div className={cn(styles.root, className)}>
        <div className={styles.inner}>
          <Typography variant="body-2" centered>{t('book_warning_2')}</Typography>
          <BookProductForm
            skus={skus}
            chosenSkuId={chosenSkuId}
            productId={productId}
            onSuccess={onSuccess}
            sizeGridSlot={<SizeGridButton variant="icon" />}
            type="reservation"
          />
        </div>
      </div>
    </MainModal>
  );
});
