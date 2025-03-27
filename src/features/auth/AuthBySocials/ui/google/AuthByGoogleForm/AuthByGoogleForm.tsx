import { memo } from 'react';
import cn from 'classnames';
import styles from './AuthByGoogleForm.module.scss';
import { RequiredValidator, SameWithValidator, useForm } from '@/shared/lib/hooks/useForm';
import { useSelector } from 'react-redux';
import { authBySocialsSelectors } from '../../../model/selectors/authBySocialsSelectors';
import { AuthByGoogleFormData } from '../../../model/types/AuthByGoogleFormData';
import { PhoneField } from '@/shared/ui/Form/PhoneField';
import { PasswordField } from '@/shared/ui/Form/PasswordField';
import { useTranslation } from 'next-i18next';
import { Button } from '@/shared/ui/Button';
import { FlexCol } from '@/shared/ui/Flex';
import { Typography } from '@/shared/ui/Typography';
import { useAuthBySocialsActions } from '../../../model/slices/authBySocialsSlice';
import { signUp, SignUpBody, useLazySessionFetchQuery } from '@/entities/Session';
import { routerPaths } from '@/shared/config/router';
import { isValidationError } from '@/shared/types/type-guards';
import { validationErrorHandler } from '@/shared/lib/utils/validationErrorHandler';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useRouter } from 'next/router';
import { useErrorNotification } from '@/shared/ui/Notification';
import { DateField } from '@/shared/ui/Form/DateField';

interface AuthByGoogleFormProps {
  className?: string;
}

export const AuthByGoogleForm = memo(({ className }: AuthByGoogleFormProps) => {
  const { t } = useTranslation();
  const [sessionFetch] = useLazySessionFetchQuery();
  const dispatch = useAppDispatch();
  const { notify } = useErrorNotification();
  const { push } = useRouter();
  const googleData = useSelector(authBySocialsSelectors.getGoogleModalData);
  const { closeGoogleModal } = useAuthBySocialsActions();
  const onSubmit = async (data: AuthByGoogleFormData) => {
    const registerData:SignUpBody = {
      ...googleData,
      ...data,
    };
    try {
      await dispatch(signUp.initiate(registerData))
        .unwrap();
      await sessionFetch();
      closeGoogleModal();
      push(routerPaths.office);
    } catch (e) {
      if (isValidationError(e)) {
        validationErrorHandler(e);
      } else {
        notify();
      }
    }
  };

  const {
    field,
    submitHandler,
  } = useForm<AuthByGoogleFormData>({
    initialState: {
      phone: '',
      password: '',
      birthday: '',
      password_confirmation: '',
    },
    validatorConfig: {
      password: [
        new RequiredValidator({ message: t('validation.required') }),
      ],
      password_confirmation: [
        new SameWithValidator({
          target: 'password',
          message: t('passwords_must_match'),
        }),
      ],
      phone: [
        new RequiredValidator({ message: t('validation.required') }),
      ],
    },
    onSubmit,
  });

  return (
    <form onSubmit={submitHandler} className={cn(styles.root, className)}>
      <Typography centered color="grey-dark" variant="body-2">{t('enter-phone-number')}</Typography>
      <FlexCol className="mt-5" gap="12">
        <DateField
          size="big"
          placeholder={t('birthday')}
          {...field('birthday')}
        />
        <PhoneField placeholder={t('phone')} {...field('phone')} />
        <PasswordField placeholder={t('password')} {...field('password')} />
        <PasswordField placeholder={t('confirm_password')} {...field('password_confirmation')} />
      </FlexCol>
      <Button fullWidth className="mt-4" type="submit" size="large">{t('next')}</Button>
    </form>
  );
});
