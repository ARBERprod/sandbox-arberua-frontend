import { memo, ReactElement, useState } from 'react';
import cn from 'classnames';
import { useForm } from '@/shared/lib/hooks/useForm';
import { Typography } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import { TextField } from '@/shared/ui/Form/TextField';
import { PasswordField } from '@/shared/ui/Form/PasswordField';
import { signIn, useLazySessionFetchQuery } from '@/entities/Session';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { isCredentialsError, isValidationError } from '@/shared/types/type-guards';
import { validationErrorHandler } from '@/shared/lib/utils/validationErrorHandler';
import { ErrorMessage } from '@/shared/ui/Form/ErrorMessage';
import { useTranslation } from 'next-i18next';
import styles from './AuthByEmailForm.module.scss';
import { AuthFormData } from '../../model/types/AuthFormData';
import { initialState, validatorConfig } from '../../config/formConfig';

interface AuthByEmailFormProps {
  className?: string;
  onSubmit: (data: AuthFormData) => void;
  recoverPasswordSlot?: ReactElement;
}

export const AuthByEmailForm = memo(({
  onSubmit,
  className,
  recoverPasswordSlot,
}: AuthByEmailFormProps) => {
  const dispatch = useAppDispatch();
  const [credError, setCredError] = useState('');
  const [sessionFetch] = useLazySessionFetchQuery();
  const { t } = useTranslation();
  const submitAuthForm = async (data: AuthFormData) => {
    try {
      await dispatch(signIn.initiate({
        login: data.login,
        password: data.password,
      }))
        .unwrap();
      await sessionFetch();
      onSubmit(data);
    } catch (e) {
      if (isCredentialsError(e)) {
        setCredError(`${t('auth.invalid_username_or_password')}`);
      } else if (isValidationError(e)) {
        validationErrorHandler(e);
      }
    }
  };
  const {
    submitHandler,
    field,
  } = useForm({
    initialState,
    validatorConfig: validatorConfig(t),
    onSubmit: submitAuthForm,
  });
  return (
    <div className={cn(styles.root, className)}>
      <Typography className="mb-5" variant="title-4">{t('auth.authorization')}</Typography>
      <form data-testid="form" onSubmit={submitHandler} className={styles.form}>
        <TextField className="mb-4" label={t('email')} placeholder={t('email')} {...field('login')} />
        <PasswordField label={t('password')} {...field('password')} />
        {credError && <ErrorMessage error={credError} />}
        {recoverPasswordSlot
          && (
            <div className="mt-3">
              {recoverPasswordSlot}
            </div>
          )}
        <Button type="submit" className="mt-6" fullWidth size="large">{t('sign_in')}</Button>
      </form>
    </div>
  );
});
