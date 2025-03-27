import { memo, useId } from 'react';
import cn from 'classnames';
import { ConsultationsForm } from '@/entities/Consultation';
import { MainModal } from '@/shared/ui/Modal';
import { useSelector } from 'react-redux';
import { submitFormOutside } from '@/shared/lib/utils/submitFormOutside';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { useTranslation } from 'next-i18next';
import { editConsultationSelectors } from '../../model/selectors/editConsultationSelectors';
import styles from './EditConsultationModal.module.scss';
import { useEditConsultationActions } from '../../model/slices/editConsultationSlice';
import { ConsultantPicker, getMockStaffs } from '@/entities/Staff';

interface EditConsultationModalProps {
  className?: string;
}

const consultants = getMockStaffs();

export const EditConsultationModal = memo(({ className }:EditConsultationModalProps) => {
  const currentModal = useSelector(editConsultationSelectors.getCurrentModal);
  const isModalVisible = useSelector(editConsultationSelectors.getIsModalVisible);
  const formId = useId();
  const { t } = useTranslation();
  const {
    closeModal, hideModal, showModal, setActiveModal,
  } = useEditConsultationActions();
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

  const submitHandler = (data:any) => {
    // Api call to edit consultation
    setActiveModal('success');
  };

  const onDeleteButtonClick = () => {
    setActiveModal('deleting-confirm');
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
      <div className={cn(styles.inner, className)}>
        <ConsultationsForm
          formId={formId}
          onSubmit={submitHandler}
          consultantPicker={(field) => (
            <ConsultantPicker
              label={t('consultant.chose_consultant')}
              onFocus={focusHandler}
              consultants={consultants}
              onBack={onBack}
              onCloseModal={onClose}
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
            {t('save')}
          </Button>
        </Flex>
      </div>
    </MainModal>
  );
});
