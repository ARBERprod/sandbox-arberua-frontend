import { memo } from 'react';
import { useSelector } from 'react-redux';
import { SuccessModal } from '@/shared/ui/Modal';
import { useTranslation } from 'next-i18next';
import { recoverPasswordSelectors } from '../../model/selectors/recoverPasswordSelectors';
import { useRecoverPasswordActions } from '../../model/slices/recoverPasswordSlice';

interface RecoverPasswordSuccessModalProps {
  className?: string;
}

export const RecoverPasswordSuccessModal = memo(({ className }: RecoverPasswordSuccessModalProps) => {
  const { t } = useTranslation();
  const activeModal = useSelector(recoverPasswordSelectors.getActiveModal);
  const isOpen = activeModal === 'success';
  const { closeModal } = useRecoverPasswordActions();
  const closeHandler = () => {
    closeModal();
  };
  return (
    <SuccessModal
      className={className}
      isOpen={isOpen}
      onClose={closeHandler}
      text={t('auth.forgot_password.check_email')}
      lazy
      unmountOnClose
      centered
    />
  );
});
