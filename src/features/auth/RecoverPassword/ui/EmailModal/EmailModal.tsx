import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';
import { MainModal } from '@/shared/ui/Modal';
import { isValidationError } from '@/shared/types/type-guards';
import { validationErrorHandler } from '@/shared/lib/utils/validationErrorHandler';
import { recoverPasswordSelectors } from '../../model/selectors/recoverPasswordSelectors';
import { useRecoverPasswordActions } from '../../model/slices/recoverPasswordSlice';
import { EmailForm } from '../EmailForm';
import { useForgetPasswordMutation } from '@/entities/Session';
import { PageLoader } from '@/shared/ui/Loader';
import { useErrorNotification } from '@/shared/ui/Notification';

interface EmailModalProps {
  className?: string;
}

export const EmailModal = memo(({ className }: EmailModalProps) => {
  const { t } = useTranslation();
  const activeModal = useSelector(recoverPasswordSelectors.getActiveModal);
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
  const { notify } = useErrorNotification();
  const isOpen = activeModal === 'email';
  const {
    closeModal,
    openModal,
  } = useRecoverPasswordActions();

  const onClose = () => {
    closeModal();
  };

  const submitHandler = async (data: { email: string }) => {
    try {
      await forgetPassword(data).unwrap();
      openModal({ type: 'success' });
    } catch (e) {
      if (isValidationError(e)) {
        validationErrorHandler(e);
      } else {
        notify();
      }
    }
  };

  return (
    <MainModal
      withBackButton
      onBack={onClose}
      isOpen={isOpen}
      onClose={onClose}
      className={className}
      title={t('auth.password_recovery')}
      unmountOnClose
      lazy
    >
      {isLoading && <PageLoader />}
      <EmailForm onSubmit={submitHandler} />
    </MainModal>
  );
});
