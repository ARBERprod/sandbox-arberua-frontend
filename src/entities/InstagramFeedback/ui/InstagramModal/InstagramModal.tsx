import { memo } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import CloseIcon from '@/shared/assets/icons/close.svg';

import { OverlayingModal } from '@/shared/ui/Modal';
import { Svg } from '@/shared/ui/Svg';
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader';
import { instagramFeedbackSelectors } from '../../model/selectors/instagramFeedbackSelectors';
import { instagramFeedbackReducer, useInstagramFeedbackActions } from '../../model/slices/instagramFeedbackSlice';
import styles from './InstagramModal.module.scss';
import { InstagramCard } from '../InstagramCard';
import { ProductSlider } from '@/widgets/ProductPresenter';

interface InstagramModalProps {
  className?: string;
  withCloseBtn?: boolean;
}

export const InstagramModal = memo(({
  className,
  withCloseBtn = true,
}:InstagramModalProps) => {
  const isOpen = useSelector(instagramFeedbackSelectors.getIsModalOpen);
  const instagram = useSelector(instagramFeedbackSelectors.getInstagram);
  const { closeModal } = useInstagramFeedbackActions();
  const closeHandler = () => {
    closeModal();
  };

  return (
    <DynamicModuleLoader reducers={{ instagramFeedback: instagramFeedbackReducer }}>
      <OverlayingModal
        isOpen={isOpen}
        onClose={closeHandler}
        width="900"
        className={cn(styles.overlay, className)}
        centered
        fullScreenMobile
      >
        <div className={styles.root}>
          {withCloseBtn
        && (
          <button className={styles.close_btn} onClick={closeHandler}>
            <Svg Icon={CloseIcon} stroke="grey" width={14} height={14} />
          </button>
        )}
          <div className={styles.inner}>
            {instagram
            && (
              <InstagramCard
                showDetailsOnClick={false}
                instagram={instagram}
                className={styles.instagram}
              />
            )}
            {instagram && instagram.products.length > 0
            && (
              <ProductSlider
                onAddProductToCart={closeHandler}
                products={instagram.products}
                slidesPerView={1}
                className={styles.product}
              />
            )}
          </div>
        </div>
      </OverlayingModal>
    </DynamicModuleLoader>
  );
});
