import { memo, useCallback } from 'react';
import cn from 'classnames';
import { TextField } from '@/shared/ui/Form/TextField';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { SelectField } from '@/shared/ui/Form/SelectField';
import { DateField } from '@/shared/ui/Form/DateField';
import { Loader } from '@/shared/ui/Loader';
import { isValidationError } from '@/shared/types/type-guards';
import { validationErrorHandler } from '@/shared/lib/utils/validationErrorHandler';
import { useForm } from '@/shared/lib/hooks/useForm';
import { useAuth } from '@/entities/Session';
import { sendCustomerDataEvent } from '@/features/auth/lib/sendCustomerDataEvent';
import { useTranslation } from 'next-i18next';
import { useUpdatePersonalDataMutation } from '../../api/editPersonalDataApi';
import { UserPersonalFormData } from '../../model/types/types';
import styles from './PersonalDataForm.module.scss';
import { useEditPersonalDataActions } from '../../model/slices/editPersonalDataSlice';
import { validatorConfig } from '../../config/personalFormConfig';
import { personalDataFormHelper } from '../../lib/PersonalDataFormHelper';

interface PersonalDataFormProps {
  className?: string;
}

export const PersonalDataForm = memo(({ className }:PersonalDataFormProps) => {
  const [
    updatePersonalData, { isLoading },
  ] = useUpdatePersonalDataMutation();
  const { t } = useTranslation();
  const { userData } = useAuth();
  const { closeModal, setActiveEditPersonalDataFormView } = useEditPersonalDataActions();

  const onSubmit = useCallback(async (formData: UserPersonalFormData) => {
    try {
      const personalDataDto = personalDataFormHelper.prepareFormStateToSending(formData);
      await updatePersonalData(personalDataDto).unwrap();
      // SESSION_TAG refetch is async, so userData is still stale here — build the snapshot from the
      // submitted form over the current identifiers. Backend owns the real update; this event only
      // links the web session to the contact.
      if (userData) sendCustomerDataEvent({ ...userData, ...personalDataDto });
      closeModal();
      setActiveEditPersonalDataFormView(null);
    } catch (e) {
      if (isValidationError(e)) {
        validationErrorHandler(e);
      }
    }
  }, [closeModal, setActiveEditPersonalDataFormView, updatePersonalData, userData]);

  const { field, submitHandler } = useForm({
    initialState: personalDataFormHelper.getInitialFormState(userData),
    onSubmit,
    validatorConfig: validatorConfig(t),
  });

  return (
    <div className={cn(styles.root, className)}>
      {isLoading && (
        <Flex justify="center">
          <Loader size={20} />
        </Flex>
      )}
      <form onSubmit={submitHandler}>
        <div className={styles.inner}>
          <TextField
            label={t('last_name')}
            className={styles.control}
            size="big"
            {...field('last_name')}
          />
          <TextField
            label={t('first_name')}
            className={styles.control}
            size="big"
            {...field('first_name')}
          />
          <TextField
            label={t('surname')}
            className={styles.control}
            size="big"
            {...field('middle_name')}
          />
          <SelectField
            label={t('sex')}
            options={[
              { value: 'male', label: `${t('male-big')}` },
              { value: 'female', label: `${t('female-big')}` },
            ]}
            className={styles.control}
            {...field('sex')}
          />
          <DateField
            label={t('birthday')}
            placeholder={t('birthday')}
            className={styles.control}
            size="big"
            {...field('birthday')}
          />
          <div className={styles.btn_wrap}>
            <Button className={styles.button} size="large" type="submit" fullWidth>{t('save')}</Button>
          </div>
        </div>
      </form>
    </div>
  );
});
