import { memo, ReactNode } from 'react';
import cn from 'classnames';
import { Svg } from '@/shared/ui/Svg';
import LocationIcon from '@/shared/assets/icons/location.svg';
import { Typography } from '@/shared/ui/Typography';
import { Flex } from '@/shared/ui/Flex';
import { SuccessModal } from '@/shared/ui/Modal';
import { useTranslation } from 'next-i18next';
import styles from './AvailabilityStoresButton.module.scss';
import { useSelector } from 'react-redux';
import { productAvailabilityReducer, useProductAvailabilityActions } from '../../model/productAvailabilitySlice';
import { productAvailabilitySelectors } from '../../model/productAvailabilitySelectors';
import { AvailabilityStoresModal } from '../AvailabilityStoresModal';
import { AvailabilityModalBook } from '../AvailabilityModalBook';
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader';
import { ProductSku } from '@/entities/Product';

interface AvailabilityStoresButtonProps {
  className?: string;
  children: ReactNode;
  productId: string;
  skus: ProductSku[];
  chosenSkuId: string | null;
}

export const AvailabilityStoresButton = memo(({
  className,
  children,
  productId,
  skus = [],
  chosenSkuId,
}:AvailabilityStoresButtonProps) => {
  const { openModal, closeModal } = useProductAvailabilityActions();
  const isBookModalSuccessOpen = useSelector(productAvailabilitySelectors.getIsModalOpenByType('booking-success'));
  const { t } = useTranslation();

  const clickHandler = () => {
    openModal({ productId, type: 'product-availability' });
  };

  const closeHandler = () => {
    closeModal();
  };

  return (
    <DynamicModuleLoader reducers={{ productAvailability: productAvailabilityReducer }}>
      <Flex
        align="center"
        gap="4"
        className={cn(className, styles.root)}
        onClick={clickHandler}
        role="presentation"
      >
        <Svg Icon={LocationIcon} />
        <Typography underlined variant="body-2">{children}</Typography>
      </Flex>
      <AvailabilityStoresModal />
      <AvailabilityModalBook skus={skus} chosenSkuId={chosenSkuId} />
      <SuccessModal
        isOpen={isBookModalSuccessOpen}
        onClose={closeHandler}
        title={t('book.success_modal.title')}
        text={t('book.success_modal.subtitle')}
      />
    </DynamicModuleLoader>
  );
});
