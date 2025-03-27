import { SingleSelectOption } from '@/shared/ui/Form/SelectField';
import { TFunction } from 'next-i18next';

type StatusOptionsGetter = (t:TFunction) => SingleSelectOption[]
export const statusOptions:StatusOptionsGetter = (t) => [
  {
    value: 'all',
    label: t('consultation.all'),
  },
  {
    value: 'scheduled',
    label: t('consultation.scheduled'),
  },
  {
    value: 'complete',
    label: t('consultation.complete'),
  },
];
