import { memo } from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { MainModal } from '@/shared/ui/Modal';
import { isValidationError } from '@/shared/types/type-guards';
import { validationErrorHandler } from '@/shared/lib/utils/validationErrorHandler';
import { useTranslation } from 'next-i18next';
import { recoverPasswordSelectors } from '../../model/selectors/recoverPasswordSelectors';
import { useRecoverPasswordActions } from '../../model/slices/recoverPasswordSlice';
import { PasswordForm } from '../PasswordForm';
import { PasswordRecoverFormData } from '../../model/types/PasswordRecoverFormData';
import styles from './PasswordModal.module.scss';

interface PasswordModalProps {
  className?: string;
}

export const PasswordModal = memo(({ className }: PasswordModalProps) => {
  const { t } = useTranslation();
  const activeModal = useSelector(recoverPasswordSelectors.getActiveModal);
  const isOpen = activeModal === 'password';
  const { closeModal } = useRecoverPasswordActions();
  const submitHandler = async (data: PasswordRecoverFormData) => {
    try {
      // Call to send password;
      closeModal();
    } catch (e) {
      if (isValidationError(e)) {
        validationErrorHandler(e);
      }
    }
  };

  const closeHandler = () => {
    closeModal();
  };

  return (
    <MainModal
      onBack={closeHandler}
      withBackButton
      onClose={closeHandler}
      isOpen={isOpen}
      className={cn(styles.root, className)}
      title={t('auth.forgot_password.create_new_password')}
      lazy
      unmountOnClose
    >
      <PasswordForm onSubmit={submitHandler} />
    </MainModal>
  );
});
