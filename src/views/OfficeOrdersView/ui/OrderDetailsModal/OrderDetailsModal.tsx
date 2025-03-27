import { memo } from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { MainModal } from '@/shared/ui/Modal';
import { OrderDetailsTable } from '@/entities/Order';
import styles from './OrderDetailsModal.module.scss';
import { officeOrdersSelectors } from '../../model/selectors/officeOrdersSelectors';
import { useOfficeOrdersActions } from '../../model/slices/officeOrderSlice';
import { useTranslation } from 'next-i18next';

interface OrderDetailsModalProps {
  className?: string;
}

export const OrderDetailsModal = memo(({ className }: OrderDetailsModalProps) => {
  const isOpen = useSelector(officeOrdersSelectors.getIsModalOpen);
  const order = useSelector(officeOrdersSelectors.getOrder);
  const { closeModal } = useOfficeOrdersActions();
  const { t } = useTranslation();
  const closeHandler = () => {
    closeModal();
  };
  if (!order) return null;
  return (
    <MainModal
      title={`${t('order')} ${order.order_number}`}
      width={912}
      classes={{ title: styles.title, wrapper: styles.wrapper }}
      isOpen={isOpen}
      onClose={closeHandler}
      className={cn(styles.root, className)}
      data-testid="order-details-modal"
    >
      <OrderDetailsTable className="w-full" order={order} />
    </MainModal>
  );
});
