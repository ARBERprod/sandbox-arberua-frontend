import { memo } from 'react';
import cn from 'classnames';
import { PaperModal } from '@/shared/ui/Modal';
import { SizingType } from '@/entities/Product';
import styles from './SizeGridModal.module.scss';
import { SizesView } from '@/views/SizesView';

interface SizeGridModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: SizingType;
}

export const SizeGridModal = memo(({
  className,
  onClose,
  isOpen,
  defaultTab,
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
    <SizesView hideBreadcrumps hideSizeInfo defaultTab={defaultTab} />
  </PaperModal>
));
