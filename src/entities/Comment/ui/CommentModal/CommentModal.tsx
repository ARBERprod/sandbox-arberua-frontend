import { ReactElement } from 'react';
import cn from 'classnames';
import { MainModal } from '@/shared/ui/Modal';
import { Typography } from '@/shared/ui/Typography';
import { ModalProps } from '@/shared/ui/Modal/types/ModalProps';
import styles from './CommentModal.module.scss';
import { useTranslation } from 'next-i18next';

interface CommentModalProps extends Omit<ModalProps, 'centered' | 'unmountOnClose' | 'width' | 'lazy'> {
  className?: string;
  children?: ReactElement;
  title: string;
}

export const CommentModal = ({
  className, children, title, ...modalProps
}: CommentModalProps) => {
  const { t } = useTranslation();
  return (
    <MainModal
      lazy
      title={t('write_review')}
      width={530}
      centered
      unmountOnClose
      {...modalProps}
      className={cn(styles.root, className)}
    >
      <Typography centered variant="body-2">{title}</Typography>
      <div className="mt-6">
        {children}
      </div>
    </MainModal>
  );
};
