import { memo } from 'react';
import cn from 'classnames';
import { TextField } from '@/shared/ui/Form/TextField';
import { Button } from '@/shared/ui/Button';
import { useAuth } from '@/entities/Session';
import { RequiredValidator, useForm } from '@/shared/lib/hooks/useForm';
import { isValidationError } from '@/shared/types/type-guards';
import { validationErrorHandler } from '@/shared/lib/utils/validationErrorHandler';
import { Loader } from '@/shared/ui/Loader';
import { useTranslation } from 'next-i18next';
import { sendCustomerDataEvent } from '@/features/auth/lib/sendCustomerDataEvent';
import { useEditPersonalDataActions } from '../../model/slices/editPersonalDataSlice';
import { useUpdateEmailMutation } from '../../api/editPersonalDataApi';
import styles from './EmailForm.module.scss';

interface EmailFormProps {
  className?: string;
}

export const EmailForm = memo(({ className }: EmailFormProps) => {
  const [updateEmail, { isLoading }] = useUpdateEmailMutation();
  const { closeModal } = useEditPersonalDataActions();
  const { t } = useTranslation();
  const { userData } = useAuth();
  const onSubmit = async (data: { email: string }) => {
    try {
      await updateEmail(data)
        .unwrap();
      // Session refetch is async; send the new email over current identifiers (see PersonalDataForm).
      if (userData) sendCustomerDataEvent({ ...userData, email: data.email });
      closeModal();
    } catch (e) {
      if (isValidationError(e)) {
        validationErrorHandler(e);
      }
    }
  };
  const {
    field,
    submitHandler,
  } = useForm<{ email: string }>({
    initialState: {
      email: userData ? userData.email : '',
    },
    validatorConfig: { email: [new RequiredValidator({ message: `${t('enter_email')}` })] },
    onSubmit,
  });
  return (
    <form className={cn(styles.root, className)} onSubmit={submitHandler}>
      <TextField
        label={t('email')}
        size="big"
        {...field('email')}
        className={styles.control}
      />
      {isLoading ? <Loader size={48} centered />
        : <Button type="submit" className="mt-1" size="large" fullWidth>{t('save')}</Button>}
    </form>
  );
});
