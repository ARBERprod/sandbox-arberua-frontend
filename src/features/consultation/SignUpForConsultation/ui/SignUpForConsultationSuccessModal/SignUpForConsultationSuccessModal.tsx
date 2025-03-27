import { memo } from 'react';
import { useTranslation } from 'next-i18next';
import { useSelector } from 'react-redux';
import { SuccessModal } from '@/shared/ui/Modal';
import { signUpForConsultationSelectors } from '../../model/selectors/signUpForConsultationSelectors';
import { useSignUpForConsultationActions } from '../../model/slices/signUpForConsultationSlice';

interface SignUpForConsultationSuccessModalProps {
  className?: string;
}

export const SignUpForConsultationSuccessModal = memo(({ className }:SignUpForConsultationSuccessModalProps) => {
  const { t } = useTranslation();
  const isOpen = useSelector(signUpForConsultationSelectors.getCurrentModal) === 'success';
  const { closeModal } = useSignUpForConsultationActions();

  const closeHandler = () => {
    closeModal();
  };

  return (
    <SuccessModal
      isOpen={isOpen}
      onClose={closeHandler}
      className={className}
      centered
      unmountOnClose
      title={t('consultation.sign_up.success_modal.title')}
      text={t('consultation.sign_up.success_modal.subtitle')}
      width={532}
    />
  );
});
