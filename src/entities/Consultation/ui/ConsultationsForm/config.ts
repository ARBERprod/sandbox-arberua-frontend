import { ValidatorConfig } from '@/shared/lib/hooks/useForm/types';
import { RequiredValidator } from '@/shared/lib/hooks/useForm';
import { ConsultationFormData } from '../../model/ConsultationFormData';
import { TFunction } from 'next-i18next';

export const defaultState: ConsultationFormData = {
  type: 'online',
  user_name: '',
  phone: '',
  employee_id: '',
};
type validatorConfigGetter = (t:TFunction) =>ValidatorConfig<ConsultationFormData>;
export const validatorConfig: validatorConfigGetter = (t) => ({
  type: [new RequiredValidator({ message: t('select-format') })],
  user_name: [new RequiredValidator({ message: t('enter-your-name') })],
  phone: [new RequiredValidator({ message: t('enter-your-phone-number') })],
  employee_id: [new RequiredValidator({ message: t('enter-consultant') })],
});

export const FORMAT_OPTIONS = (t:TFunction) => [
  {
    label: t('offline'),
    value: 'offline',
  },
  {
    label: t('online'),
    value: 'online',
  },
];
