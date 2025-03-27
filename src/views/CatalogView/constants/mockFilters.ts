import { FilterItem, FilterType } from '@/entities/Filter';

export const mockFilters: FilterItem[] = [
  {
    type: FilterType.CHECKBOX,
    slug: 'size',
    title: 'Размер',
    values: [
      { title: 'S', slug: 'SSS', is_chosen: false },
      { title: 'M', slug: 'MMM', is_chosen: false },
      { title: 'L', slug: 'LLL', is_chosen: false },
    ],
  },
  {
    type: FilterType.CHECKBOX,
    slug: 'color',
    title: 'Цвет',
    values: [
      { is_chosen: false, title: 'Красный', slug: 'red' },
      { is_chosen: false, title: 'Зеленый', slug: 'green' },
      { is_chosen: false, title: 'Желтый', slug: 'yellow' },
    ],
  },
  {
    type: FilterType.RADIO,
    slug: 'sex',
    title: 'Пол',
    values: [
      { is_chosen: false, title: 'Мужской', slug: 'male' },
      { is_chosen: false, title: 'Женский', slug: 'female' },
    ],
  },
];
