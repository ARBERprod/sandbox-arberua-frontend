import { memo } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { useSelector } from 'react-redux';
import { MainModal } from '@/shared/ui/Modal';
import { Typography } from '@/shared/ui/Typography';
import { Flex } from '@/shared/ui/Flex';
import { Button } from '@/shared/ui/Button';
import { useAuthModel } from '@/widgets/Auth';
import { sendCommentSelectors } from '../../model/selectors/sendCommentButtonSelectors';
import { useSendCommentButtonActions } from '../../model/slices/sendCommentButtonSlice';
import styles from './SendCommentWarningModal.module.scss';

interface SendCommentWarningModalProps {
  className?: string;
}

export const SendCommentWarningModal = memo(({ className }: SendCommentWarningModalProps) => {
  const isOpen = useSelector(sendCommentSelectors.getIsWarningModalActive);
  const receiver = useSelector(sendCommentSelectors.getReceiver);
  const { openLoginModal, openRegisterModal } = useAuthModel();
  const { closeModal } = useSendCommentButtonActions();
  const closeHandler = () => {
    closeModal();
  };

  const loginHandler = () => {
    closeModal();
    openLoginModal();
  };
  const registerHandler = () => {
    closeModal();
    openRegisterModal();
  };
  const { t } = useTranslation();

  return (
    <MainModal
      centered
      isOpen={isOpen}
      onClose={closeHandler}
      lazy
      width={530}
      title={t('leave_review')}
      classes={{
        wrapper: styles.root,
      }}
      className={className}
    >
      <Typography centered variant="body-1" className={styles.maxW}>
        {receiver === 'product' ? t('card.comment.modal.text') : t('card.comment.modal.seller_text')}
      </Typography>
      <Flex className={cn(styles.maxW, 'mt-8')} gap="12">
        <Button fullWidth onClick={loginHandler}>
          {t('log_in')}
        </Button>
        <Button onClick={registerHandler} fullWidth color="light-secondary">{t('register')}</Button>
      </Flex>
    </MainModal>
  );
});
