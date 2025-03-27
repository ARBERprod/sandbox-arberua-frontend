import cn from 'classnames';
import styles from './OrderStatus.module.scss';

interface OrderStatusCircleProps {
  className?: string;
  color: string;
}

export const OrderStatusCircle = ({ className, color }: OrderStatusCircleProps) => (
  <div className={cn(styles.circle, className)} style={{ backgroundColor: color }} />
);
