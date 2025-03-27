import { memo, useRef } from 'react';
import cn from 'classnames';
import { PaperModal } from '@/shared/ui/Modal';
import styles from './SizeGridModal.module.scss';
import { SizesView } from '@/views/SizesView';

interface SizeGridModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGridModal = memo(({
  className,
  onClose,
  isOpen,
}: SizeGridModalProps) => (
  <PaperModal
    width={992}
    className={cn(styles.root, className)}
    isOpen={isOpen}
    onClose={onClose}
    classes={
      { wrapper: styles.wrapper }
    }
  >
    <SizesView hideBreadcrumps hideSizeInfo />
  </PaperModal>
));
