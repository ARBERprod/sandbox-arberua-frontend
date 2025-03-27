import { RadioOption } from '@/shared/ui/Form/RadioField';

export const deliveryOptions:RadioOption[] = [
  {
    value: '1',
    label: 'На отделении “Новая Почта”',
  },
  {
    value: '2',
    label: 'Курьером “Новая Почта”',
  },
  {
    value: '3',
    label: 'На магазин',
  },
];

export const paymentOptions:RadioOption[] = [
  {
    value: '1',
    label: 'Банковской картой на сайте',
  },
  {
    value: '2',
    label: 'Наличными при получении',
  },
];
