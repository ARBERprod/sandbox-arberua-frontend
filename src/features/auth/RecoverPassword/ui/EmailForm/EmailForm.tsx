import { memo } from 'react';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import { RequiredValidator, useForm } from '@/shared/lib/hooks/useForm';
import { TextField } from '@/shared/ui/Form/TextField';
import { Typography } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import styles from './EmailForm.module.scss';

interface EmailFormProps {
  className?: string;
  onSubmit: (data: {email: string}) => void;
}

export const EmailForm = memo(({ className, onSubmit }:EmailFormProps) => {
  const { t } = useTranslation();
  const { field, submitHandler } = useForm({
    initialState: {
      email: '',
    },
    onSubmit,
    validatorConfig: {
      email: [new RequiredValidator({ message: t('validation.required') })],
    },
  });
  return (
    <form onSubmit={submitHandler} className={cn(styles.root, className)}>
      <Typography centered color="grey-dark">
        {t('auth.forgot_password.email')}
      </Typography>
      <div className={styles.container}>
        <TextField
          label="E-mail"
          placeholder="E-mail"
          {...field('email')}
        />
        <Button type="submit" size="large">{t('next')}</Button>
      </div>
    </form>
  );
});
