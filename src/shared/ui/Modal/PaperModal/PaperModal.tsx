import { memo, ReactNode } from 'react';
import cn from 'classnames';
import { OverlayingModal } from '@/shared/ui/Modal';
import { Svg } from '@/shared/ui/Svg';
import CloseIcon from '@/shared/assets/icons/close.svg';
import { ModalProps } from '../types/ModalProps';
import styles from './PaperModal.module.scss';

interface PaperModalProps extends ModalProps {
  className?: string;
  withCloseBtn?: boolean;
  children: ReactNode;

  classes?: {
    wrapper?: string;
  }
}

export const PaperModal = memo(({
  className,
  withCloseBtn = true,
  children,
  classes,
  ...modalProps
}: PaperModalProps) => (
  <OverlayingModal {...modalProps} width={modalProps.width || 530} className={className}>
    <div className={cn(styles.root, classes?.wrapper)}>
      {withCloseBtn
        && (
          <button className={styles.closeBtn} onClick={modalProps.onClose}>
            <Svg Icon={CloseIcon} stroke="grey" width={14} height={14} />
          </button>
        )}
      {children}
    </div>
  </OverlayingModal>
));
