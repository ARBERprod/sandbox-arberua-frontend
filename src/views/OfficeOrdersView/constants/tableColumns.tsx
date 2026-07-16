import dayjs from 'dayjs';
import { TableColumn } from '@/shared/ui/Table/types';
import { Order, OrderStatus, OrderStatusCircle } from '@/entities/Order';
import { Typography } from '@/shared/ui/Typography';
import { TFunction } from 'i18next';
import { OrderDetailsButton } from '../ui/OrderDetailsButton';
import { displayPrice } from '@/shared/lib/utils/displayPrice';

export const tableColumns: (t: TFunction) => TableColumn<Order>[] = (t) => [
  {
    header: '',
    accessor: ({ status }) => (status ? <OrderStatusCircle color={status.color} /> : null),
    data: {
      cellAlign: 'right',
    },
  },
  {
    header: t('office.idStatus'),
    accessor: ({ status, order_number }) => (
      <OrderStatus status={status} orderId={order_number} />
    ),
    data: {
      headAlign: 'left',
      cellAlign: 'left',
    },
  },
  {
    accessor: 'date',
    header: t('office.date'),
    sortAccessor: ({ date }) => dayjs(date).unix(),
    data: {
      headAlign: 'left',
      cellAlign: 'left',
    },
  },
  {
    accessor: 'count',
    header: t('office.goodsQty'),
    data: {
      cellAlign: 'center',
      headAlign: 'center',
    },
  },
  {
    accessor: ({ total_price }) => (
      <Typography variant="body-3" weight={500}>
        {displayPrice(total_price)}
      </Typography>
    ),
    header: t('office.summ'),
  },
  {
    accessor: 'deduct_bonus',
    header: t('office.deduct_bonus'),
    data: {
      cellAlign: 'center',
      headAlign: 'center',
    },
  },
  {
    accessor: (order) => (
      <OrderDetailsButton order={order} />
    ),
    header: '',
  },
];
