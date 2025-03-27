import { memo } from 'react';
import cn from 'classnames';
import { RequiredValidator, useForm } from '@/shared/lib/hooks/useForm';
import { Typography } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import { PasswordField } from '@/shared/ui/Form/PasswordField';
import { useTranslation } from 'next-i18next';
import styles from './PasswordForm.module.scss';

export interface PasswordFormProps {
  className?: string;
  onSubmit: (data: {password: string}) => void;
  title: string;
  btnText: string;
}

export const PasswordForm = memo(({
  onSubmit, btnText, title, className,
}:PasswordFormProps) => {
  const { t } = useTranslation();
  const { submitHandler, field } = useForm({
    onSubmit,
    initialState: {
      password: '',
    },
    validatorConfig: {
      password: [
        new RequiredValidator({ message: `${t('auth.enter_password')}` }),
      ],
    },
  });
  return (
    <form aria-label="password" onSubmit={submitHandler} className={cn(styles.root, className)}>
      <Typography className={styles.title} variant="body-2">{title}</Typography>
      <PasswordField className="mt-5" {...field('password')} />
      <Button className="mt-4" size="large" type="submit">{btnText}</Button>
    </form>
  );
});
