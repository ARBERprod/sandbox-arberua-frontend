import { memo } from 'react';
import cn from 'classnames';
import { useForm } from '@/shared/lib/hooks/useForm';
import { RequiredValidator } from '@/shared/lib/hooks/useForm/validators';
import { Typography } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import { PhoneField } from '@/shared/ui/Form/PhoneField';
import { useTranslation } from 'next-i18next';
import { TextField } from '../../../../shared/ui/Form/TextField';
import styles from './CallbackForm.module.scss';
import { CallbackFormData } from '../../model/types/CallbackFormData';

interface CallbackFormProps {
  className?: string;
  onSubmit: (data: CallbackFormData) => void;
}

export const CallbackForm = memo(({ onSubmit, className }:CallbackFormProps) => {
  const { t } = useTranslation();
  const { submitHandler, field } = useForm<CallbackFormData>({
    initialState: {
      first_name: '',
      phone: '',
    },
    onSubmit,
    validationMode: 'onSubmit',
    validatorConfig: {
      first_name: [
        new RequiredValidator({ message: t('callback.form.message') }),
      ],
      phone: [
        new RequiredValidator({ message: t('callback.form.message') }),
      ],
    },
  });
  return (
    <form onSubmit={submitHandler} className={cn(styles.root, className)}>
      <Typography variant="body-2" color="grey-dark" className={styles.title}>{t('callback.form.title')}</Typography>
      <TextField placeholder={t('first_name')} {...field('first_name')} />
      <PhoneField placeholder={t('phone')} {...field('phone')} className="mt-3" />
      <Button size="large" type="submit" className="mt-4">
        {t('contact.form.btn')}
      </Button>
    </form>
  );
});
