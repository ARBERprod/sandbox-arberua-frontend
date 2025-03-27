import { memo } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { MainModal } from '@/shared/ui/Modal';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { signUp, useLazySessionFetchQuery } from '@/entities/Session';
import { isValidationError } from '@/shared/types/type-guards';
import { validationErrorHandler } from '@/shared/lib/utils/validationErrorHandler';
import { routerPaths } from '@/shared/config/router';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
// import { AuthBySocials } from '@/features/auth/AuthBySocials';
import { RegisterFormData } from '../../../model/types/RegisterFormData';
import { useAuthActions } from '../../../model/slices/authSlice';
import { RegisterForm } from '../RegisterForm';
import { AuthProposal } from '../../AuthProposal';
import { authSelectors } from '../../../model/selectors/authSelectors';
import { AuthModalType } from '../../../model/types/AuthSchema';
import styles from './RegisterModal.module.scss';
import { useErrorNotification } from '@/shared/ui/Notification';

interface RegisterModalProps {
  className?: string;
}

export const RegisterModal = memo(({ className }: RegisterModalProps) => {
  const dispatch = useAppDispatch();
  const { push } = useRouter();
  const {
    closeModal,
    setActiveModal,
  } = useAuthActions();
  const [sessionFetch] = useLazySessionFetchQuery();
  const { notify } = useErrorNotification();
  const activeModal = useSelector(authSelectors.getActiveModal);
  const { t } = useTranslation();
  const isOpen = activeModal === AuthModalType.REGISTER;
  const closeHandler = () => {
    closeModal();
  };
  const onSubmit = async (data: RegisterFormData, eventId?: string) => {
    try {
      await dispatch(signUp.initiate({ ...data, eventId }))
        .unwrap();
      await sessionFetch();
      closeHandler();
      push(routerPaths.office);
    } catch (e) {
      if (isValidationError(e)) {
        validationErrorHandler(e);
      } else {
        notify();
      }
    }
  };
  const backHandler = () => {
    setActiveModal(AuthModalType.LOGIN_USERNAME);
  };
  return (
    <MainModal
      unmountOnClose
      onClose={closeHandler}
      isOpen={isOpen}
      title={t('register')}
      withBackButton
      onBack={backHandler}
      className={cn(styles.root, className)}
    >
      <div className={styles.container}>
        <RegisterForm onSubmit={onSubmit} className={styles.form} />
        {/* <AuthBySocials onRegisterModalOpen={closeModal} onSuccess={closeModal} className="mt-5 w-full" /> */}
        <AuthProposal to="login" className="mt-7" />
      </div>
    </MainModal>
  );
});
