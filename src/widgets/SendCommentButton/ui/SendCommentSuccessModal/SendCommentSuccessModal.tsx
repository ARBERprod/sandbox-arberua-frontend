import { memo } from 'react';
import { useSelector } from 'react-redux';
import { SuccessModal } from '@/shared/ui/Modal';
import { useTranslation } from 'next-i18next';
import { sendCommentSelectors } from '../../model/selectors/sendCommentButtonSelectors';
import { useSendCommentButtonActions } from '../../model/slices/sendCommentButtonSlice';

interface SendCommentSuccessModalProps {
  className?: string;
}

export const SendCommentSuccessModal = memo(({ className }:SendCommentSuccessModalProps) => {
  const isOpen = useSelector(sendCommentSelectors.getIsSuccessModalActive);
  const { closeModal } = useSendCommentButtonActions();
  const closeHandler = () => {
    closeModal();
  };
  const { t } = useTranslation();
  return (
    <SuccessModal
      isOpen={isOpen}
      title={t('card.comment.modal1.text')}
      onClose={closeHandler}
      className={className}
    />
  );
});
