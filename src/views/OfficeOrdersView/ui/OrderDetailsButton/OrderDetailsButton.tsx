import { memo } from 'react';
import { Svg } from '@/shared/ui/Svg';
import ChevronDownIcon from '@/shared/assets/icons/chevron-r.svg';
import { Order } from '@/entities/Order';
import { useOfficeOrdersActions } from '../../model/slices/officeOrderSlice';

interface OrderDetailsButtonProps {
  className?: string;
  order: Order;
}

export const OrderDetailsButton = memo(({ className, order }:OrderDetailsButtonProps) => {
  const { openModal } = useOfficeOrdersActions();
  const clickHandler = () => {
    openModal({ order });
  };
  return (
    <button aria-label="details" className={className} onClick={clickHandler}>
      <Svg height={12} width={8} Icon={ChevronDownIcon} />
    </button>
  );
});
