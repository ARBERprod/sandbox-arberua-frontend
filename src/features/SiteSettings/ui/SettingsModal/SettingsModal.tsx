import { memo } from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import CloseIcon from '@/shared/assets/icons/close.svg';
import { OverlayingModal } from '@/shared/ui/Modal';
import { Svg } from '@/shared/ui/Svg';
import { siteSettingsSelectors } from '../../model/selectors/siteSettingsSelectors';
import { useSiteSettingsActions } from '../../model/slices/siteSettingsSlice';
import { SettingsImage } from '../SettingsImage';
import styles from './SettingsModal.module.scss';
import { SettingsForm } from '../SettingsForm';

interface SettingsModalProps {
  className?: string;
  withCloseBtn?: boolean;
  withImage?: boolean;
}

export const SettingsModal = memo(({
  className,
  withCloseBtn = true,
  withImage = false,
}: SettingsModalProps) => {
  const isOpen = useSelector(siteSettingsSelectors.getIsSettingsModalOpen);
  const { closeSettingsModal } = useSiteSettingsActions();
  const closeHandler = () => {
    closeSettingsModal();
  };

  return (
    <OverlayingModal
      isOpen={isOpen}
      onClose={closeHandler}
      className={cn(styles.overlay, className)}
      centered
      width={530}
      unmountOnClose
      fullScreenMobile
    >
      <div
        className={cn(styles.root, {
          [styles.has_no_image]: !withImage,
        })}
      >
        {withCloseBtn
          && (
            <button className={styles.close_btn} onClick={closeHandler}>
              <Svg Icon={CloseIcon} stroke="grey" width={14} height={14} />
            </button>
          )}
        <div className={styles.inner}>
          {withImage && <SettingsImage className={styles.image} />}
          <div
            className={cn(styles.form_wrap, {
              [styles.has_no_image]: !withImage,
            })}
          >
            <SettingsForm />
          </div>
        </div>
      </div>
    </OverlayingModal>
  );
});
