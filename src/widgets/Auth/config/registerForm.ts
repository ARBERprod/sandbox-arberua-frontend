import { RequiredValidator, SameWithValidator } from '@/shared/lib/hooks/useForm';
import { RegisterFormData } from '../model/types/RegisterFormData';
import { TFunction } from 'next-i18next';

export const initData:RegisterFormData = {
  first_name: '',
  middle_name: '',
  email: '',
  birthday: '',
  last_name: '',
  password: '',
  phone: '',
  password_confirmation: '',
};

export const validatorConfig = (t: TFunction) => ({
  first_name: [
    new RequiredValidator({ message: t('validation.required') }),
  ],
  email: [
    new RequiredValidator({ message: t('validation.required') }),
  ],
  last_name: [
    new RequiredValidator({ message: t('validation.required') }),
  ],
  middle_name: [
    new RequiredValidator({ message: t('validation.required') }),
  ],
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
});
