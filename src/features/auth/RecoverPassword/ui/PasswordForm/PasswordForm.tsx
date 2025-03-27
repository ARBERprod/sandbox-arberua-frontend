import { memo } from 'react';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { useForm } from '@/shared/lib/hooks/useForm';
import { Typography } from '@/shared/ui/Typography';
import { TextField } from '@/shared/ui/Form/TextField';
import { PasswordField } from '@/shared/ui/Form/PasswordField';
import { Button } from '@/shared/ui/Button';
import { FlexCol } from '@/shared/ui/Flex';
import styles from './PasswordForm.module.scss';
import { PasswordRecoverFormData } from '../../model/types/PasswordRecoverFormData';
import { recoverPasswordSelectors } from '../../model/selectors/recoverPasswordSelectors';
import { validatorConfig } from './config';

interface PasswordFormProps {
  className?: string;
  onSubmit: (data: PasswordRecoverFormData) => void;
}

export const PasswordForm = memo(({ className, onSubmit }:PasswordFormProps) => {
  const { t } = useTranslation();
  const initEmail = useSelector(recoverPasswordSelectors.getEmail);
  const { field, submitHandler } = useForm<PasswordRecoverFormData>({
    initialState: {
      email: initEmail,
      password: '',
      password_confirmation: '',
    },
    validatorConfig: validatorConfig(t),
    onSubmit,
  });
  return (
    <form onSubmit={submitHandler} className={cn(styles.root, className)}>
      <Typography color="grey-dark">
        {t('auth.create_new_password')}
      </Typography>
      <FlexCol gap="16" fullWidth className="mt-6">
        <TextField
          label="E-mail"
          placeholder="E-mail"
          {...field('email')}
        />
        <PasswordField
          label={t('auth.new_password')}
          placeholder={t('auth.new_password')}
          {...field('password')}
        />
        <PasswordField
          label={t('auth.repeat_password')}
          placeholder={t('auth.repeat_password')}
          {...field('password_confirmation')}
        />
      </FlexCol>
      <Button className="mt-5" fullWidth type="submit" size="large">{t('save')}</Button>
    </form>
  );
});
