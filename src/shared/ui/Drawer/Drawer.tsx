import { ReactNode, useId } from 'react';
import cn from 'classnames';
import { useBodyOverflow } from '@/shared/lib/components/FloatingProvider';
import { Svg } from '@/shared/ui/Svg';
import CrossIcon from '@/shared/assets/icons/close.svg';
import styles from './Drawer.module.scss';

interface DrawerProps {
  className?: string;
  isOpen: boolean;
  anchor?: 'left' | 'right';
  onClose: () => void;
  withCloseButton?: boolean;
  children: ReactNode;
}

export const Drawer = ({
  className, isOpen, onClose, children, anchor = 'right', withCloseButton,
}:DrawerProps) => {
  const drawerId = useId();
  useBodyOverflow({
    elementId: drawerId,
    condition: isOpen,
    unlockOnUnmount: true,
  });

  return (
    <div className={cn(styles.root, { [styles.active]: isOpen }, styles[anchor])}>
      <div role="presentation" className={styles.backdrop} onClick={onClose} />
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
      <div tabIndex={0} />
      <div className={cn(styles.body, className)}>
        {withCloseButton
          && (
            <button onClick={onClose} className={styles.closeBtn}>
              <Svg Icon={CrossIcon} stroke="grey" width={14} height={14} />
            </button>
          )}
        {children}
      </div>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
      <div tabIndex={0} />
    </div>
  );
};
