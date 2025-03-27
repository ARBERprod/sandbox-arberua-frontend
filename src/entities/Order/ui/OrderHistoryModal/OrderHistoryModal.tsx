import { memo } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { MainModal } from '@/shared/ui/Modal';
import { Flex, FlexCol } from '@/shared/ui/Flex';
import { Typography } from '@/shared/ui/Typography';
import { getOrderHistoryProgressHeight } from '../../lib/getOrderHistoryProgressHeight';
import styles from './OrderHistoryModal.module.scss';
import { OrderHistory } from '../../model/types';

interface OrderHistoryModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  orderHistory?: OrderHistory[];
}

export const OrderHistoryModal = memo(({
  className,
  onClose,
  isOpen,
  orderHistory = [],
}: OrderHistoryModalProps) => {
  const { t } = useTranslation();
  const progressHeight = getOrderHistoryProgressHeight(orderHistory.length);
  return (
    <MainModal
      width={530}
      centered
      title={t('order-history.btn')}
      isOpen={isOpen}
      onClose={onClose}
      className={cn(styles.root, className)}
      data-testid="history-modal"
    >
      <div className={styles.container}>
        <div className={styles.progress}>
          <div className={styles.progressInner} style={{ height: `${progressHeight}px` }} />
        </div>
        <FlexCol gap="16" className={styles.body}>
          {orderHistory.map((item) => (
            <Flex data-testid="history-item" key={item.id} justify="start" align="start" className={styles.item}>
              <Typography variant="body-2" className={styles.date}>{item.created_at || '-'}</Typography>
              <Typography variant="body-2" className={styles.status}>{item.title}</Typography>
            </Flex>
          ))}
        </FlexCol>
      </div>
    </MainModal>
  );
});
