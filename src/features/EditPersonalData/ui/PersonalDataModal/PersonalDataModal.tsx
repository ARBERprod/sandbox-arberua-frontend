import { FC, memo } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { MainModal } from '@/shared/ui/Modal';
import { useTranslation } from 'next-i18next';
import { EditPersonalDataFormView } from '../../model/types/EditPersonalDataSchema';
import { editPersonalDataSelectors } from '../../model/selectors/editPersonalDataSelectors';
import { useEditPersonalDataActions } from '../../model/slices/editPersonalDataSlice';
import { EmailForm } from '../EmailForm';
import { PasswordForm } from '../PasswordForm';
import { PersonalDataForm } from '../PersonalDataForm';
import { PhoneNumberForm } from '../PhoneNumberForm';
import styles from './PersonalDataModal.module.scss';

const editPersonalDataFormViewsMap: Record<EditPersonalDataFormView, FC> = {
  [EditPersonalDataFormView.EMAIL_FORM]: EmailForm,
  [EditPersonalDataFormView.PASSWORD_FORM]: PasswordForm,
  [EditPersonalDataFormView.PERSONAL_DATA_FORM]: PersonalDataForm,
  [EditPersonalDataFormView.PHONE_NUMBER_FORM]: PhoneNumberForm,
};

interface PersonalDataModalProps {
  className?: string;
}

export const PersonalDataModal = memo(({ className }: PersonalDataModalProps) => {
  const activeFormView = useSelector(editPersonalDataSelectors.getActiveEditPersonalDataFormView);
  const { t } = useTranslation();
  const CurrentFormView = activeFormView && editPersonalDataFormViewsMap[activeFormView];

  const isOpen = useSelector(editPersonalDataSelectors.getIsModalOpen);
  const {
    closeModal,
    setActiveEditPersonalDataFormView,
  } = useEditPersonalDataActions();
  const closeHandler = () => {
    closeModal();
    setActiveEditPersonalDataFormView(null);
  };

  return (
    <MainModal
      isOpen={isOpen}
      onClose={closeHandler}
      className={cn(styles.overlay, className)}
      centered
      title={t('edit-data')}
      withBackButton
      withCloseBtn
      onBack={closeHandler}
    >
      <div className={cn(styles.root, className)}>
        {CurrentFormView && <CurrentFormView />}
      </div>
    </MainModal>
  );
});
