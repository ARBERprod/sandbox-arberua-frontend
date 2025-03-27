import { ValidatorConfig } from '@/shared/lib/hooks/useForm/types';
import { RequiredValidator, SameWithValidator } from '@/shared/lib/hooks/useForm';
import { PasswordRecoverFormData } from '../../model/types/PasswordRecoverFormData';
import { TFunction } from 'next-i18next';

type ValidatorConfigGetter=(t:TFunction)=>ValidatorConfig<PasswordRecoverFormData>
export const validatorConfig:ValidatorConfigGetter = (t) => ({
  email: [new RequiredValidator({ message: t('enter_email') })],
  password: [
    new RequiredValidator({ message: t('auth.enter_password') }),
  ],
  password_confirmation: [
    new SameWithValidator({
      message: t('passwords_must_match'),
      target: 'password',
    }),
  ],
});
