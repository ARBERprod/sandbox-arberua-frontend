import { memo } from 'react';
import cn from 'classnames';
import { Button } from '@/shared/ui/Button';
import { Typography } from '@/shared/ui/Typography';
import { TextAreaField } from '@/shared/ui/Form/TextAreaField';
import { useForm } from '@/shared/lib/hooks/useForm';
import { useTranslation } from 'next-i18next';
import styles from './OfficeFeedbackForm.module.scss';
import { useNotification } from '@/shared/ui/Notification';
import { isValidationError } from '@/shared/types/type-guards';
import { validationErrorHandler } from '@/shared/lib/utils/validationErrorHandler';
import { useSendFeedbackMutation } from '../../api/contactUsApi';
import { PageLoader } from '@/shared/ui/Loader';
import { useUserData } from '@/entities/Session';

interface FeedbackFormProps {
  className?: string;
}

export const OfficeFeedbackForm = memo(({
  className,
}:FeedbackFormProps) => {
  const { t } = useTranslation(['office-page', 'common']);
  const [sendFeedback, { isLoading }] = useSendFeedbackMutation();
  const { notify } = useNotification({ type: 'success', title: t('common:contact.success') });
  const { first_name, email } = useUserData();
  const onSubmit = async ({ content }: {content: string}) => {
    try {
      await sendFeedback({ content, user_name: first_name, email }).unwrap();
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
    initialState: {
      content: '',
    },
    onSubmit,
  });

  return (
    <div className={cn(styles.root, className)}>
      {isLoading && <PageLoader />}
      <form onSubmit={submitHandler}>
        <Typography variant="title-5" className={styles.title}>{t('office-page:questions')}</Typography>
        <Typography variant="body-2" className={styles.subtitle}>{t('office-page:manager_contacts_you')}</Typography>
        <TextAreaField
          className={styles.field}
          placeholder={t('office-page:leave_your_comment')}
          label={t('office-page:your_comment')}
          {...field('content')}
        />
        <Button type="submit" fullWidth size="large" className={styles.button}>{t('office-page:send')}</Button>
      </form>
    </div>
  );
});
