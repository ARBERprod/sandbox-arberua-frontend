import { TableColumn } from '@/shared/ui/Table/types';
import { Bonus } from '@/entities/Bonus';
import dayjs from 'dayjs';
import { TFunction } from 'i18next';
import { Typography } from '@/shared/ui/Typography';

export const tableColumns: (t: TFunction) => TableColumn<Bonus>[] = (t) => [
  {
    accessor: 'created_at',
    header: t('office.date'),
    sortAccessor: ({ created_at }) => dayjs(created_at).unix(),
  },
  {
    header: t('office.name'),
    accessor: 'content',
  },
  {
    header: t('office.accrued'),
    accessor: ({ amount, type }) => (
      <Typography variant="body-3">{type === 'earn' ? amount : amount * -1}</Typography>
    ),
  },
];
