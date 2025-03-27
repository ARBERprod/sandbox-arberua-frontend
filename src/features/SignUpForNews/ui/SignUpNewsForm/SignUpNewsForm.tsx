import { memo, useId, useState } from 'react';
import { TextField } from '@/shared/ui/Form/TextField';
import { Button } from '@/shared/ui/Button';
import { RequiredValidator, useForm } from '@/shared/lib/hooks/useForm';
import { Portal } from '@/shared/ui/Portal';
import { PageLoader } from '@/shared/ui/Loader';
import { isValidationError } from '@/shared/types/type-guards';
import { validationErrorHandler } from '@/shared/lib/utils/validationErrorHandler';
import { useTranslation } from 'next-i18next';
import { Label } from '@/shared/ui/Form/Label';
import { SuccessModal } from '@/shared/ui/Modal';
import cn from 'classnames';
import styles from './SignUpNewsForm.module.scss';
import { useSignUpNewsMutation } from '../../api/signUpNewsApi';

interface SignUpNewsFormProps {
  className?: string;
}

export const SignUpNewsForm = memo(({ className }: SignUpNewsFormProps) => {
  const inputId = useId();
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const [signUp, { isLoading }] = useSignUpNewsMutation();
  const onSubmit = async ({ email }: { email: string }) => {
    try {
      await signUp({ email })
        .unwrap();
      setModalOpen(true);
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
      email: '',
    },
    validatorConfig: {
      email: [new RequiredValidator({ message: `${t('enter_email')}` })],
    },
    clearFormAfterSuccess: true,
    onSubmit,
  });
  return (
    <>
      <form onSubmit={submitHandler} className={cn(styles.root, className)}>
        <Label className={styles.label} htmlFor={inputId}>{t('footer.form.label')}</Label>
        <TextField id={inputId} className={styles.field} placeholder="Email" {...field('email')} />
        <Button color="light-tertiary" type="submit" className={styles.button}>{t('subscribe')}</Button>
      </form>

      <SuccessModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={t('footer.news.success_modal.title')}
        text={t('footer.news.success_modal.text')}
      />
      {isLoading
        && (
          <Portal mountInBody>
            <PageLoader />
          </Portal>
        )}
    </>
  );
});
