import { memo } from 'react';
import cn from 'classnames';
import { MainModal } from '@/shared/ui/Modal';
import { useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';
import { useAuthActions } from '../../../model/slices/authSlice';
import { authSelectors } from '../../../model/selectors/authSelectors';
import { AuthModalType } from '../../../model/types/AuthSchema';
import { PasswordForm } from '../../PasswordForm';
import styles from './PasswordModal.module.scss';

interface PasswordModalProps {
  className?: string;
}

export const PasswordModal = memo(({ className }: PasswordModalProps) => {
  const {
    closeModal,
  } = useAuthActions();
  const { t } = useTranslation();
  const activeModal = useSelector(authSelectors.getActiveModal);
  const isOpen = activeModal === AuthModalType.RECOVER_PASSWORD;
  const closeHandler = () => {
    closeModal();
  };
  const onSubmit = () => {
    closeHandler();
  };
  return (
    <MainModal isOpen={isOpen} onClose={closeHandler} title={t('auth.new_password')} className={cn(styles.root, className)}>
      <div className={styles.container}>
        <PasswordForm onSubmit={onSubmit} title={t('auth.create_new_password')} btnText={t('change_password_and_log_in')} />
      </div>
    </MainModal>
  );
});
