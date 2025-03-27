import { memo } from 'react';
import cn from 'classnames';
import { Svg } from '@/shared/ui/Svg';
import CloseIcon from '@/shared/assets/icons/close.svg';
import CheckIcon from '@/shared/assets/icons/check.svg';
import { Typography } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import { useTranslation } from 'next-i18next';
import { ModalProps } from '../types/ModalProps';
import { OverlayingModal } from '../OverlayingModal';
import styles from './SuccessModal.module.scss';

interface SuccessModalProps extends ModalProps {
  className?: string;
  title?: string;
  text?: string;
}

export const SuccessModal = memo(({
  className,
  text,
  title,
  onClose,
  isOpen,
  unmountOnClose = true,
  width = 530,
  lazy = true,
  centered = true,
}: SuccessModalProps) => {
  const { t } = useTranslation();
  return (
    <OverlayingModal
      width={width}
      centered={centered}
      unmountOnClose={unmountOnClose}
      lazy={lazy}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className={cn(styles.root, className)}>
        <button className={styles.closeBtn} onClick={onClose}>
          <Svg Icon={CloseIcon} stroke="grey" width={14} height={14} />
        </button>
        <div className={styles.icon}>
          <Svg width={23} height={13} Icon={CheckIcon} />
        </div>
        {title
        && (
          <Typography variant="title-5" centered className={styles.title}>
            {title}
          </Typography>
        )}
        {text
        && (
          <Typography variant="body-1" centered className={styles.text}>
            {text}
          </Typography>
        )}
        <Button className={styles.btn} size="large" onClick={onClose}>
          {t('ok')}
        </Button>
      </div>
    </OverlayingModal>
  );
});
