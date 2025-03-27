import { SingleSelectOption } from '@/shared/ui/Form/SelectField';
import { Language } from '@/shared/config/lang';

export const countriesOptionsMocked: SingleSelectOption[] = [
  {
    value: 'Ukraine',
    label: 'Ukraine',
  },
  {
    value: 'USA',
    label: 'USA',
  },
  {
    value: 'Germany',
    label: 'Germany',
  },
];

export const citiesOptionsMocked: SingleSelectOption[] = [
  {
    value: 'Odessa',
    label: 'Odessa',
  },
  {
    value: 'Kyev',
    label: 'Kyev',
  },
  {
    value: 'Lviv',
    label: 'Lviv',
  },
];

export const languagesOptionsMocked: SingleSelectOption[] = [
  {
    value: Language.UKRAINIAN,
    label: 'Українська',
  },
  {
    value: Language.RUSSIAN,
    label: 'Русский',
  },
  {
    value: Language.ENGLISH,
    label: 'English',
  },
];

export const currenciesOptionsMocked: SingleSelectOption[] = [
  {
    value: 'USD',
    label: 'USD',
  },
  {
    value: 'EUR',
    label: 'EUR',
  },
  {
    value: 'UAH',
    label: 'UAH',
  },
];
