import { memo } from 'react';
import { FlexCol } from '@/shared/ui/Flex';
import { Typography } from '@/shared/ui/Typography';
import { OrderStatus as IOrderStatus } from '../../model/types';
import styles from './OrderStatus.module.scss';

interface OrderStatusProps {
  orderId: number;
  status: IOrderStatus;
  className?: string;
}

export const OrderStatus = memo(({ className, status, orderId }:OrderStatusProps) => (
  <FlexCol className={className} gap="4">
    <Typography variant="body-3" color="#6c6c6c">{orderId}</Typography>
    <Typography variant="body-3" className={styles.title}>{status.title}</Typography>
  </FlexCol>
));
