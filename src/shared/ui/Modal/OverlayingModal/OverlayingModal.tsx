import {
  ReactNode, useCallback, useEffect, useId, useState,
} from 'react';
import cn from 'classnames';
import { Portal } from '@/shared/ui/Portal';
import { useBodyOverflow } from '@/shared/lib/components/FloatingProvider/useBodyOverflow';
import styles from './OverlayingModal.module.scss';
import { ModalProps } from '../types/ModalProps';

interface OverlayingModalProps extends ModalProps {
  children: ReactNode;
  className?: string;
  fullScreenMobile?: boolean;
}

export const OverlayingModal = ({
  isOpen,
  children,
  lazy,
  className,
  unmountOnClose,
  onClose,
  centered,
  width,
  fullScreenMobile,
  rootClassName,
  ...restModalProps
}: OverlayingModalProps) => {
  const modalId = useId();
  const [isMounted, setMounted] = useState(false);
  const closeHandler = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);
  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeHandler();
    }
  }, [closeHandler]);
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
    }
  }, [isOpen]);

  useBodyOverflow({ elementId: modalId, condition: isOpen, unlockOnUnmount: true });

  useEffect(() => {
    window.addEventListener('keyup', onKeyDown);
    return () => {
      window.removeEventListener('keyup', onKeyDown);
    };
  }, [onKeyDown]);

  const mods = {
    [styles.opened]: isOpen,
    [styles.centered]: centered,
  };
  if (lazy && !isMounted) return null;

  if (unmountOnClose && !isOpen) return null;
  return (
    <Portal>
      <div className={cn(styles.root, mods, rootClassName)}>
        {isOpen
          && <div role="presentation" className={styles.mask} />}
        <div
          role="presentation"
          onMouseDown={closeHandler}
          className={cn(styles.wrap, {
            [styles.fullScreenMobile]: fullScreenMobile,
          })}
        >
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <div
            onMouseDown={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-hidden={!isOpen}
            data-testid={restModalProps['data-testid']}
            className={cn(styles.modal, {
              [styles.fullScreenMobileInner]: fullScreenMobile,
            }, className)}
            style={{
              width,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};
