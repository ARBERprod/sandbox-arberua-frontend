import { memo } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { MainModal } from '@/shared/ui/Modal';
import { Typography } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import { useTranslation } from 'next-i18next';
import { authSelectors } from '../../../model/selectors/authSelectors';
import { AuthModalType } from '../../../model/types/AuthSchema';
import { useAuthActions } from '../../../model/slices/authSlice';
import styles from './EmailModal.module.scss';

interface EmailModalProps {
  className?: string;
}

export const EmailModal = memo(({ className }: EmailModalProps) => {
  const {
    closeModal,
    setActiveModal,
  } = useAuthActions();
  const activeModal = useSelector(authSelectors.getActiveModal);
  const userLogin = useSelector(authSelectors.getUserLogin);
  const { t } = useTranslation();
  const isOpen = activeModal === AuthModalType.RECOVER_EMAIL;
  const closeHandler = () => {
    closeModal();
  };
  const backHandler = () => {
    setActiveModal(AuthModalType.LOGIN_USERNAME);
  };
  return (
    <MainModal
      onClose={closeHandler}
      withBackButton
      isOpen={isOpen}
      onBack={backHandler}
      title={t('auth.password_recovery')}
      className={cn(styles.root, className)}
    >
      <div className={styles.container}>
        <Typography centered color="grey-dark" variant="body-2">
          {t('auth.to_the_address')}
          {' '}
          {userLogin}
          {' '}
          {t('auth.sent_for_password_reset')}
        </Typography>
        <Button onClick={closeHandler} className={styles.btn} size="large">{t('ok')}</Button>
      </div>
    </MainModal>
  );
});
