import { ValidatorConfig } from '@/shared/lib/hooks/useForm/types';
import { RequiredValidator } from '@/shared/lib/hooks/useForm';
import { AddressFormData } from '../../model/AddressFormData';
import { TFunction } from 'next-i18next';

export const defaultData: AddressFormData = {
  city_id: '',
  country_id: '',
  flat: '',
  house: '',
  index: '',
  street: '',
};
type validatorConfigGetter = (t:TFunction) => ValidatorConfig<AddressFormData>;
export const validatorConfig: validatorConfigGetter = (t) => ({
  city_id: [new RequiredValidator({ message: t('validation.required') })],
  country_id: [new RequiredValidator({ message: t('validation.required') })],
  index: [new RequiredValidator({ message: t('validation.required') })],
  house: [new RequiredValidator({ message: t('validation.required') })],
  flat: [new RequiredValidator({ message: t('validation.required') })],
  street: [new RequiredValidator({ message: t('validation.required') })],
});
