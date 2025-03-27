import { ValidatorConfig } from '@/shared/lib/hooks/useForm/types';
import { OneOfValidator, RequiredValidator } from '@/shared/lib/hooks/useForm';
import { TFunction } from 'next-i18next';
import { UserPersonalFormData } from '../model/types/types';

export const defaultData:UserPersonalFormData = {
  first_name: '',
  birthday: '',
  sex: 'male',
  last_name: '',
  middle_name: '',
};

export const validatorConfig: (t: TFunction) => ValidatorConfig<UserPersonalFormData> = (t) => ({
  first_name: [new RequiredValidator({ message: t('validation.required') })],
  last_name: [new RequiredValidator({ message: t('validation.required') })],
  sex: [new OneOfValidator({ value: ['male', 'female'] })],
});
