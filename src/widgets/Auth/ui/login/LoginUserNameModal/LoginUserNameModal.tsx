import { memo } from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { MainModal } from '@/shared/ui/Modal';
import { useTranslation } from 'next-i18next';
import { AuthBySocials } from '@/features/auth/AuthBySocials';
import { useAuthActions } from '../../../model/slices/authSlice';
import { AuthModalType } from '../../../model/types/AuthSchema';
import { AuthProposal } from '../../AuthProposal';
import { authSelectors } from '../../../model/selectors/authSelectors';
import styles from './LoginUserNameModal.module.scss';
import { LoginUserNameForm } from '../LoginUserNameForm';

interface LoginUserNameModalProps {
  className?: string;
}

export const LoginUserNameModal = memo(({ className }: LoginUserNameModalProps) => {
  const activeModal = useSelector(authSelectors.getActiveModal);
  const isOpen = activeModal === AuthModalType.LOGIN_USERNAME;
  const {
    closeModal,
    setActiveModal,
    setLogin,
  } = useAuthActions();
  const onSubmit = async (data: { username: string }) => {
    setLogin(data.username);
    setActiveModal(AuthModalType.LOGIN_PASSWORD);
  };
  const onClose = () => {
    closeModal();
  };
  const { t } = useTranslation();
  return (
    <MainModal
      width={530}
      onClose={onClose}
      isOpen={isOpen}
      withCloseBtn
      unmountOnClose
      title={t('sign_in')}
      className={cn(styles.root, className)}
    >
      <div className={styles.container}>
        <LoginUserNameForm onSubmit={onSubmit} />
        {/* <AuthBySocials onRegisterModalOpen={closeModal} onSuccess={closeModal} className="mt-10" /> */}
        <AuthProposal className={styles.proposal} to="register" />
      </div>
    </MainModal>
  );
});

// TODO: Sync usernameform with store
