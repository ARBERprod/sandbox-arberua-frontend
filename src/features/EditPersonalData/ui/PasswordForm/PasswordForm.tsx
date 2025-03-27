import { memo } from 'react';
import cn from 'classnames';
import { Button } from '@/shared/ui/Button';
import { PasswordField } from '@/shared/ui/Form/PasswordField';
import { useForm } from '@/shared/lib/hooks/useForm';
import { isValidationError } from '@/shared/types/type-guards';
import { validationErrorHandler } from '@/shared/lib/utils/validationErrorHandler';
import { Loader } from '@/shared/ui/Loader';
import { useTranslation } from 'next-i18next';
import { initialState, validatorConfig } from '../../config/passwordFormConfig';
import { UserPasswordFormData } from '../../model/types/types';
import styles from './PasswordForm.module.scss';
import { useUpdatePasswordMutation } from '../../api/editPersonalDataApi';
import { useEditPersonalDataActions } from '../../model/slices/editPersonalDataSlice';

interface PasswordFormProps {
  className?: string;
}

export const PasswordForm = memo(({ className }:PasswordFormProps) => {
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
  const { t } = useTranslation();
  const { closeModal } = useEditPersonalDataActions();
  const onSubmit = async (data: UserPasswordFormData) => {
    try {
      await updatePassword(data).unwrap();
      closeModal();
    } catch (e) {
      if (isValidationError(e)) {
        validationErrorHandler(e);
      }
    }
  };
  const { field, submitHandler } = useForm<UserPasswordFormData>({
    initialState,
    validatorConfig: validatorConfig(t),
    onSubmit,
    clearFormAfterSuccess: true,
  });

  return (
    <form onSubmit={submitHandler} className={cn(styles.root, className)}>
      <div className={styles.inner}>
        <PasswordField
          label={t('current-password')}
          size="big"
          {...field('current_password')}
          className={styles.control}
        />
        <PasswordField
          label={t('auth.new_password')}
          size="big"
          {...field('password')}
          className={styles.control}
        />
        <PasswordField
          label={t('password-confirmation')}
          size="big"
          {...field('password_confirmation')}
          className={styles.control}
        />
        {isLoading ? <Loader size={48} centered />
          : <Button className="mt-1" type="submit" size="large" fullWidth>{t('save')}</Button>}
      </div>
    </form>
  );
});
