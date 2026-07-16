import cn from 'classnames';
import styles from './OrderStatus.module.scss';

interface OrderStatusCircleProps {
  className?: string;
}

export const OrderStatusCircle = ({ className }: OrderStatusCircleProps) => (
  <div className={cn(styles.circle, className)} />
);
