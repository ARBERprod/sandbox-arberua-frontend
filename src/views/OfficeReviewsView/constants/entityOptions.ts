import { SingleSelectOption } from '@/shared/ui/Form/SelectField';
import { TFunction } from 'next-i18next';

type entityOptionsGetter=(t:TFunction)=> SingleSelectOption[];
export const entityOptions: entityOptionsGetter = (t) => [
  {
    label: t('office.goods'),
    value: 'product',
  },
  {
    label: t('office.consultants'),
    value: 'consultant',
  },
];
