import { ValidatorConfig } from '@/shared/lib/hooks/useForm/types';
import { RequiredValidator } from '@/shared/lib/hooks/useForm';
import { AuthFormData } from '../model/types/AuthFormData';
import { TFunction } from 'next-i18next';

export const initialState: AuthFormData = {
  login: '',
  password: '',
};

type ValidatorConfigGetter=(t:TFunction)=>ValidatorConfig<AuthFormData>
export const validatorConfig: ValidatorConfigGetter = (t) => ({
  login: [
    new RequiredValidator({ message: t('enter_email') }),
  ],
  password: [
    new RequiredValidator({ message: t('auth.enter_password') }),
  ],
});
