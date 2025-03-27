import { memo } from 'react';
import cn from 'classnames';
import { useForm, RequiredValidator } from '@/shared/lib/hooks/useForm';
import { Typography } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import { useTranslation } from 'next-i18next';
import { TextField } from '@/shared/ui/Form/TextField';
import styles from './LoginUserNameForm.module.scss';

export interface LoginUserNameFormProps {
  className?: string;
  onSubmit: (data: {username: string}) => void;
}

export const LoginUserNameForm = memo(({ className, onSubmit }:LoginUserNameFormProps) => {
  const { t } = useTranslation();
  const { submitHandler, field } = useForm({
    initialState: {
      username: '',
    },
    validatorConfig: {
      username: [
        new RequiredValidator({ message: `${t('auth.enter_username')}` }),
      ],
    },
    onSubmit,
  });
  return (
    <form aria-label="username" onSubmit={submitHandler} className={cn(styles.root, className)}>
      <Typography className={styles.title} color="grey-dark" variant="body-2">{t('auth.enter_your_login_details')}</Typography>
      <TextField placeholder={t('auth.phone_or_email')} {...field('username')} className="mb-8" />
      <Button size="large" type="submit">{t('auth.continue')}</Button>
    </form>
  );
});
