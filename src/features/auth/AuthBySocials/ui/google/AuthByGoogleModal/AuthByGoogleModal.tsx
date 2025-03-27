import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import { MainModal } from '@/shared/ui/Modal';
import { AuthByGoogleForm } from '../AuthByGoogleForm';
import { authBySocialsSelectors } from '../../../model/selectors/authBySocialsSelectors';
import { useAuthBySocialsActions } from '../../../model/slices/authBySocialsSlice';
import styles from './AuthByGoogleModal.module.scss';

interface AuthByGoogleModalProps {
  className?: string;
}

export const AuthByGoogleModal = memo(({ className }: AuthByGoogleModalProps) => {
  const { t } = useTranslation();
  const isOpen = useSelector(authBySocialsSelectors.getIsGoogleModalOpen);
  const { closeGoogleModal } = useAuthBySocialsActions();

  return (
    <MainModal
      title={t('register')}
      isOpen={isOpen}
      onClose={() => closeGoogleModal()}
      className={cn(styles.root, className)}
      unmountOnClose
    >
      <div className={styles.container}>
        <AuthByGoogleForm className={styles.form} />
      </div>
    </MainModal>
  );
});
