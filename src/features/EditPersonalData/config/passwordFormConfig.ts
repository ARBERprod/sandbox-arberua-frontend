import { ValidatorConfig } from '@/shared/lib/hooks/useForm/types';
import { RequiredValidator, SameWithValidator } from '@/shared/lib/hooks/useForm';
import { UserPasswordFormData } from '../model/types/types';
import { TFunction } from 'next-i18next';

export const initialState: UserPasswordFormData = {
  current_password: '',
  password: '',
  password_confirmation: '',
};

type validatorConfigGetter=(t:TFunction)=> ValidatorConfig<UserPasswordFormData>;
export const validatorConfig: validatorConfigGetter = (t) => ({
  current_password: [new RequiredValidator({ message: t('auth.enter_password') })],
  password: [new RequiredValidator({ message: t('auth.enter_password') })],
  password_confirmation: [
    new SameWithValidator({
      message: t('passwords_must_match'),
      target: 'password',
    }),
  ],
});
