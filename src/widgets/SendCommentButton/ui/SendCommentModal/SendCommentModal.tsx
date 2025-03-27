import { memo } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { MainModal } from '@/shared/ui/Modal';
import { Typography } from '@/shared/ui/Typography';
import { AddCommentForm } from '@/features/AddCommentForm';
import { useTranslation } from 'next-i18next';
import styles from './SendCommentModal.module.scss';
import { sendCommentSelectors } from '../../model/selectors/sendCommentButtonSelectors';
import { useSendCommentButtonActions } from '../../model/slices/sendCommentButtonSlice';

interface SendCommentModalProps {
  className?: string;
}

export const SendCommentModal = memo(({ className }: SendCommentModalProps) => {
  const {
    closeModal,
    showSuccessModal,
  } = useSendCommentButtonActions();
  const isOpen = useSelector(sendCommentSelectors.getIsCommentModalActive);
  const receiverId = useSelector(sendCommentSelectors.getId);
  const receiverType = useSelector(sendCommentSelectors.getReceiver);
  const { t } = useTranslation();

  const closeHandler = () => {
    closeModal();
  };

  const successHandler = () => {
    showSuccessModal();
  };

  if (!receiverId) return null;
  return (
    <MainModal
      isOpen={isOpen}
      lazy
      title={t('write_review')}
      width={530}
      centered
      onClose={closeHandler}
      unmountOnClose
      className={cn(styles.root, className)}
    >
      <Typography centered variant="body-2">
        {receiverType === 'product' ? t('card.comment.rate_product')
          : t('card.comment.seller_product')}
      </Typography>
      <AddCommentForm
        className={styles.form}
        receiverId={receiverId}
        receiverType={receiverType}
        onSuccess={successHandler}
      />
    </MainModal>
  );
});
