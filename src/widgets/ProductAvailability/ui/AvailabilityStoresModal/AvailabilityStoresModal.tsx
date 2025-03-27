import { memo } from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { OverlayingModal } from '@/shared/ui/Modal';
import CloseIcon from '@/shared/assets/icons/close.svg';
import { Svg } from '@/shared/ui/Svg';
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery';
import { breakpoints } from '@/shared/config/breakpoints';
import { AvailabilityModalContent } from '../AvailabilityModalContent';
import { AvailabilityModalMap } from '../AvailabilityModalMap';
import styles from './AvailabilityStoresModal.module.scss';
import { productAvailabilitySelectors } from '../../model/productAvailabilitySelectors';
import { useProductAvailabilityActions } from '../../model/productAvailabilitySlice';

interface AvailabilityStoresModalProps {
  className?: string;
}

export const AvailabilityStoresModal = memo(({
  className,
}:AvailabilityStoresModalProps) => {
  const isMobile = useMediaQuery(breakpoints['only-mobile']);
  const isDesktop = !isMobile;
  const isOpen = useSelector(productAvailabilitySelectors.getIsModalOpenByType('product-availability'));
  const activeView = useSelector(productAvailabilitySelectors.getActiveAvailabilityView);

  const { closeModal } = useProductAvailabilityActions();

  const closeHandler = () => {
    closeModal();
  };

  const renderContent = () => {
    if (isDesktop) {
      return (
        <>
          <AvailabilityModalMap />
          <AvailabilityModalContent />
        </>
      );
    }

    if (activeView === 'map') return <AvailabilityModalMap />;

    if (activeView === 'list') return <AvailabilityModalContent />;

    return null;
  };
  return (
    <OverlayingModal
      lazy
      unmountOnClose
      isOpen={isOpen}
      onClose={closeHandler}
      className={cn(styles.root, className)}
    >
      <div className={styles.inner}>
        <button className={styles.close_btn} onClick={closeHandler}>
          <Svg Icon={CloseIcon} stroke="grey" width={14} height={14} />
        </button>
        {renderContent()}
      </div>
    </OverlayingModal>
  );
});
