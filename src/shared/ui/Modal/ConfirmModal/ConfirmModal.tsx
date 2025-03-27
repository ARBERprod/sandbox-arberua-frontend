import { memo, ReactElement } from 'react';
import { PaperModal } from '@/shared/ui/Modal';
import { Button } from '@/shared/ui/Button';
import { Typography } from '@/shared/ui/Typography';
import { useTranslation } from 'next-i18next';
import { Flex } from '@/shared/ui/Flex';
import styles from './ConfirmModal.module.scss';
import { ModalProps } from '../types/ModalProps';

interface ConfirmModalProps extends ModalProps {
  className?: string;
  content: string | ReactElement;
  acceptBtnText?: string;
  cancelBtnText?: string;
  onAccept: () => void;
  onCancel?: () => void;
}

export const ConfirmModal = memo(({
  className,
  onAccept,
  acceptBtnText,
  cancelBtnText,
  onCancel,
  content,
  rootClassName,
  isOpen,
  onClose,
  unmountOnClose = true,
  centered = true,
  lazy = true,
  width = 530,
}: ConfirmModalProps) => {
  const { t } = useTranslation();
  const renderContent = () => {
    if (typeof content === 'string') {
      return (
        <Typography variant="title-5" centered>
          {content}
        </Typography>
      );
    }
    return content;
  };
  return (
    <PaperModal
      rootClassName={rootClassName}
      isOpen={isOpen}
      onClose={onClose}
      unmountOnClose={unmountOnClose}
      centered={centered}
      lazy={lazy}
      width={width}
      className={className}
      classes={{
        wrapper: styles.wrapper,
      }}
    >
      <div className={styles.content}>
        {renderContent()}
      </div>
      <Flex gap="12" justify="center" className={styles.actions}>
        <Button
          size="large"
          color="light-secondary"
          fullWidth
          onClick={onAccept}
        >
          {acceptBtnText || t('yes_delete')}
        </Button>
        <Button
          size="large"
          fullWidth
          onClick={onCancel || onClose}
        >
          {cancelBtnText || t('cancel')}
        </Button>
      </Flex>
    </PaperModal>
  );
});
