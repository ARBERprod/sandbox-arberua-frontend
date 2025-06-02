import { memo } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { useForm } from '@/shared/lib/hooks/useForm';
import { Typography } from '@/shared/ui/Typography';
import { FlexCol } from '@/shared/ui/Flex';
import { Button } from '@/shared/ui/Button';
import { PasswordField } from '@/shared/ui/Form/PasswordField';
import { PhoneField } from '@/shared/ui/Form/PhoneField';
import { TextField } from '@/shared/ui/Form/TextField';
import { useTranslation } from 'next-i18next';
import styles from './RegisterForm.module.scss';
import { RegisterFormData } from '../../../model/types/RegisterFormData';
import { initData, validatorConfig } from '../../../config/registerForm';
import { DateField } from '@/shared/ui/Form/DateField';

interface RegisterFormProps {
  className?: string;
  onSubmit: (data: RegisterFormData, eventId?: string) => void;
}

export const RegisterForm = memo(({
  onSubmit,
  className,
}: RegisterFormProps) => {
  const { t } = useTranslation();
  const {
    field,
    submitHandler,
  } = useForm<RegisterFormData>({
    initialState: initData,
    validatorConfig: validatorConfig(t),
    onSubmit,
    onSuccess: (eventId?: string) => {
      if (typeof window !== 'undefined' && window?.fbq) {
        // window?.fbq('track', 'Registration', {}, { eventID: eventId || '' });
      }
    },
  });
  return (
    <form onSubmit={submitHandler} className={cn(styles.root, className)}>
      <Typography className="mb-5" variant="body-2" color="grey-dark" centered>
        {t('enter_your_registration_details')}
      </Typography>
      <FlexCol gap="12">
        <TextField placeholder={t('last_name')} {...field('last_name')} />
        <TextField placeholder={t('surname')} {...field('middle_name')} />
        <TextField placeholder={t('first_name')} {...field('first_name')} />
        <DateField
          placeholder={t('birthday')}
          size="big"
          {...field('birthday')}
        />
        <PhoneField placeholder={t('phone')} {...field('phone')} />
        <TextField placeholder={t('email')} {...field('email')} />
        <PasswordField placeholder={t('password')} {...field('password')} />
        <PasswordField placeholder={t('confirm_password')} {...field('password_confirmation')} />
      </FlexCol>
      <Button fullWidth className="mt-4" type="submit" size="large">{t('registers')}</Button>
      <Typography className={styles.text} color="grey-dark" variant="body-3">
        {t('registering_you_agree')}
        {' '}
        <Link href="/pages/terms-of-use">
          <Typography as="span" color="grey-dark" variant="body-3" underlined>
            {t('terms_conditions')}
          </Typography>
        </Link>
      </Typography>
    </form>
  );
});
