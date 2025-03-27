import { memo } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { useChangePasswordMutation } from '@/entities/Session';
import {
  RequiredValidator,
  SameWithValidator,
  useForm,
} from '@/shared/lib/hooks/useForm';
import { isValidationError } from '@/shared/types/type-guards';
import { validationErrorHandler } from '@/shared/lib/utils/validationErrorHandler';
import { PageLoader } from '@/shared/ui/Loader';
import { PasswordField } from '@/shared/ui/Form/PasswordField';
import { Button } from '@/shared/ui/Button';
import styles from './ChangePasswordForm.module.scss';
import { useErrorNotification } from '@/shared/ui/Notification';

interface ChangePasswordFormProps {
  className?: string;
  token: string;
  email: string;
  onSuccess?: () => void;
}

export const ChangePasswordForm = memo(
  ({
    className, token, email, onSuccess,
  }: ChangePasswordFormProps) => {
    const { t } = useTranslation();
    const { notify } = useErrorNotification();
    const [changePassword, { isLoading }] = useChangePasswordMutation();
    const onSubmit = async (data: {
      password: string;
      password_confirmation: string;
    }) => {
      try {
        const { password, password_confirmation } = data;
        await changePassword({
          token, email, password, password_confirmation,
        }).unwrap();
        onSuccess?.();
      } catch (e) {
        if (isValidationError(e)) {
          validationErrorHandler(e);
        } else {
          notify();
        }
      }
    };
    const { field, submitHandler } = useForm({
      initialState: {
        password: '',
        password_confirmation: '',
      },
      validatorConfig: {
        password: [new RequiredValidator({ message: t('auth.enter_password') })],
        password_confirmation: [
          new SameWithValidator({
            message: t('passwords_must_match'),
            target: 'password',
          }),
        ],
      },
      onSubmit,
    });
    return (
      <>
        {isLoading && <PageLoader />}
        <form onSubmit={submitHandler} className={cn(styles.root, className)}>
          <PasswordField placeholder={t('auth.new_password')} {...field('password')} />
          <PasswordField
            placeholder={t('confirm_password')}
            {...field('password_confirmation')}
          />
          <Button type="submit">{t('auth.send')}</Button>
        </form>
      </>
    );
  },
);
