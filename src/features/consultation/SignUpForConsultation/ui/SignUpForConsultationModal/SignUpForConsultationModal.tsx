import { memo, useId } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { ConsultationFormData, ConsultationsForm, useCreateConsultationMutation } from '@/entities/Consultation';
import { MainModal } from '@/shared/ui/Modal';
import { useSelector } from 'react-redux';
import { submitFormOutside } from '@/shared/lib/utils/submitFormOutside';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { signUpForConsultationSelectors } from '../../model/selectors/signUpForConsultationSelectors';
import styles from './SignUpForConsultationModal.module.scss';
import { useSignUpForConsultationActions } from '../../model/slices/signUpForConsultationSlice';
import { ConsultantPicker } from '@/entities/Staff';
import { isValidationError } from '@/shared/types/type-guards';
import { validationErrorHandler } from '@/shared/lib/utils/validationErrorHandler';
import { PageLoader } from '@/shared/ui/Loader';

interface SignUpForConsultationModalProps {
  className?: string;
}

export const SignUpForConsultationModal = memo(({ className }:SignUpForConsultationModalProps) => {
  const currentModal = useSelector(signUpForConsultationSelectors.getCurrentModal);
  const isModalVisible = useSelector(signUpForConsultationSelectors.getIsModalVisible);
  const format = useSelector(signUpForConsultationSelectors.getFormat);
  const consultants = useSelector(signUpForConsultationSelectors.getConsultants);
  const consultantId = useSelector(signUpForConsultationSelectors.getConsultantId);
  const shopId = useSelector(signUpForConsultationSelectors.getShopId);
  const consultantBlocked = useSelector(signUpForConsultationSelectors.getIsConsultantBlocked);

  const formId = useId();
  const [createConsultation, { isLoading }] = useCreateConsultationMutation();
  const { t } = useTranslation();
  const {
    closeModal, hideModal, showModal, setActiveModal,
  } = useSignUpForConsultationActions();
  const closeHandler = () => {
    closeModal();
  };
  const focusHandler = () => {
    hideModal();
  };

  const onBack = () => {
    showModal();
  };

  const onClose = () => {
    closeModal();
  };

  const submitHandler = async (data:ConsultationFormData) => {
    const {
      user_name, type, phone, employee_id,
    } = data;
    try {
      await createConsultation({
        user_name, type, phone, staff_id: employee_id, store_id: shopId,
      }).unwrap();
      setActiveModal('success');
    } catch (e) {
      if (isValidationError(e)) {
        validationErrorHandler(e);
      }
    }
  };

  const submitForm = () => {
    submitFormOutside(formId);
  };
  const isOpen = currentModal === 'form';
  return (
    <MainModal
      lazy
      title={t('consultant.change_booking')}
      width={530}
      unmountOnClose
      className={cn(styles.root, className)}
      classes={{ wrapper: styles.wrapper }}
      isOpen={isOpen}
      withCloseBtn
      onClose={closeHandler}
      centered
      rootClassName={cn({ [styles.hidden]: !isModalVisible })}
    >
      {isLoading && <PageLoader />}
      <div className={cn(styles.inner, className)}>
        <ConsultationsForm
          formId={formId}
          onSubmit={submitHandler}
          initData={{
            type: format,
            employee_id: consultantId,
          }}
          consultantPicker={(field) => (
            <ConsultantPicker
              label={t('consultant.chose_consultant')}
              onFocus={focusHandler}
              consultants={consultants}
              onBack={onBack}
              onCloseModal={onClose}
              disabled={consultantBlocked}
              {...field}
            />
          )}
        />
        <Flex gap="12" className="mt-6">
          <Button
            fullWidth
            size="large"
            onClick={submitForm}
          >
            {t('enroll')}
          </Button>
        </Flex>
      </div>
    </MainModal>
  );
});
