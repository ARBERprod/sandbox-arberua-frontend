import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { MainModal } from '@/shared/ui/Modal';
import { Typography } from '@/shared/ui/Typography';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { signIn, useForgetPasswordMutation, useLazySessionFetchQuery } from '@/entities/Session';
import { isValidationError } from '@/shared/types/type-guards';
import { validationErrorHandler } from '@/shared/lib/utils/validationErrorHandler';
import { ErrorMessage } from '@/shared/ui/Form/ErrorMessage';
import { routerPaths } from '@/shared/config/router';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useAuthActions } from '../../../model/slices/authSlice';
import { AuthModalType } from '../../../model/types/AuthSchema';
import { authSelectors } from '../../../model/selectors/authSelectors';
import { PasswordForm } from '../../PasswordForm';
import styles from './LoginUserPasswordModal.module.scss';
import { PageLoader } from '@/shared/ui/Loader';
import { useErrorNotification } from '@/shared/ui/Notification';

interface LoginUserPasswordModalProps {
  className?: string;
}

export const LoginUserPasswordModal = memo(({ className }: LoginUserPasswordModalProps) => {
  const { push } = useRouter();
  const activeModal = useSelector(authSelectors.getActiveModal);
  const userLogin = useSelector(authSelectors.getUserLogin);
  const { notify } = useErrorNotification();
  const [sessionFetch] = useLazySessionFetchQuery();
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
  const dispatch = useAppDispatch();
  const isOpen = activeModal === AuthModalType.LOGIN_PASSWORD;
  const [credError, setCredError] = useState('');
  const { t } = useTranslation();
  const {
    closeModal,
    setActiveModal,
  } = useAuthActions();
  const backHandler = () => {
    setActiveModal(AuthModalType.LOGIN_USERNAME);
  };
  const closeHandler = () => {
    closeModal();
  };

  const onSubmit = async ({ password }: { password: string }) => {
    try {
      await dispatch(signIn.initiate({
        password,
        login: userLogin,
      }))
        .unwrap();
      await sessionFetch();
      closeHandler();
      push(routerPaths.office);
    } catch (e) {
      if (isValidationError(e)) {
        setCredError(`${t('auth.invalid_username_or_password')}`);
        validationErrorHandler(e);
      }
    }
  };

  const recoverPassword = async () => {
    try {
      await forgetPassword({ email: userLogin }).unwrap();
      setActiveModal(AuthModalType.RECOVER_EMAIL);
    } catch (e) {
      if (isValidationError(e)) {
        notify({ title: e.data.errors.email?.[0] || t('something_went_wrong') });
      } else {
        notify();
      }
    }
  };
  return (
    <MainModal
      onClose={closeHandler}
      isOpen={isOpen}
      withBackButton
      onBack={backHandler}
      title={t('sign_in')}
      className={cn(styles.root, className)}
    >
      {isLoading && <PageLoader />}
      <PasswordForm className={styles.form} onSubmit={onSubmit} title={t('auth.enter_your_password')} btnText={t('log_in')} />
      {credError && <ErrorMessage className={styles.error} error={credError} />}
      <Typography as="button" className={styles.btn} variant="body-2" onClick={recoverPassword}>
        {t('auth.reset_password')}
      </Typography>
    </MainModal>
  );
});
