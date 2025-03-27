import { memo } from 'react';
import cn from 'classnames';
import { Button } from '@/shared/ui/Button';
import { Typography } from '@/shared/ui/Typography';
import { TextField } from '@/shared/ui/Form/TextField';
import { TextAreaField } from '@/shared/ui/Form/TextAreaField';
import { useForm } from '@/shared/lib/hooks/useForm';
import { useTranslation } from 'next-i18next';
import { ContactUsFormData } from '../../model/types/ContactUsFormData';
import styles from './FeedbackForm.module.scss';
import { useSendFeedbackMutation } from '../../api/contactUsApi';
import { isValidationError } from '@/shared/types/type-guards';
import { validationErrorHandler } from '@/shared/lib/utils/validationErrorHandler';
import { PageLoader } from '@/shared/ui/Loader';
import { useNotification } from '@/shared/ui/Notification';

interface ContactUsFormProps {
  className?: string;
  showTitle?: boolean;
}

export const FeedbackForm = memo(({
  className,
  showTitle = true,
}:ContactUsFormProps) => {
  const { t } = useTranslation(['contacts-page', 'common']);
  const [sendFeedback, { isLoading }] = useSendFeedbackMutation();
  const { notify } = useNotification({ type: 'success', title: t('common:contact.success') });
  const onSubmit = async (data: ContactUsFormData) => {
    try {
      await sendFeedback(data).unwrap();
      notify();
    } catch (e) {
      if (isValidationError(e)) {
        validationErrorHandler(e);
      }
    }
  };
  const {
    submitHandler,
    field,
  } = useForm({
    initialState: new ContactUsFormData(),
    onSubmit,
    clearFormAfterSuccess: true,
  });

  return (
    <div className={cn(styles.root, className)}>
      {isLoading && <PageLoader />}
      <form onSubmit={submitHandler}>
        {showTitle && <Typography variant="title-5" className={styles.title}>{t('common:contact.question')}</Typography>}
        <TextField
          className={styles.input}
          placeholder={t('contacts-page:contact.form.text1')}
          label={t('contacts-page:contact.form.text')}
          classes={{ control: styles.control }}
          {...field('user_name')}
        />
        <TextField
          className={styles.input}
          placeholder={t('contacts-page:contact.form.text3')}
          label={t('contacts-page:contact.form.text2')}
          classes={{ control: styles.control }}
          {...field('email')}
        />
        <TextAreaField
          className={styles.field}
          placeholder={t('contacts-page:contact.form.text5')}
          label={t('contacts-page:contact.form.text4')}
          classes={{ control: styles.control_textarea }}
          {...field('content')}
        />
        <Button type="submit" fullWidth size="large" className={styles.button}>{t('common:contact.form.btn')}</Button>
      </form>
    </div>
  );
});
