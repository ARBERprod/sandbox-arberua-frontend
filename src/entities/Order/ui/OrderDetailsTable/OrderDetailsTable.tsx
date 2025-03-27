import { memo, useState } from 'react';
import cn from 'classnames';
import { Typography } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import { useTranslation } from 'next-i18next';
import styles from './OrderDetailsTable.module.scss';
import { Order } from '../../model/types';
import { OrderProductCard } from '../OrderProductCard';
import { displayPrice } from '@/shared/lib/utils/displayPrice';
import { OrderHistoryModal } from '../OrderHistoryModal';

interface OrderDetailsTableProps {
  className?: string;
  order: Order;
}

export const OrderDetailsTable = memo(({
  className,
  order,
}: OrderDetailsTableProps) => {
  const { t } = useTranslation(['common', 'checkout-page']);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  return (
    <div className={cn(styles.root, className)}>
      <table className={cn(styles.table, className)}>
        <thead className={styles.thead}>
          <tr
            className={styles.tr}
          >
            <th
              className={cn(styles.th, styles.paddedTd)}
            >
              <div className={styles.statusCircle} style={{ backgroundColor: order.status.color }} />
            </th>
            <th className={styles.th}>
              <Typography variant="body-3" className={cn(styles.bold, styles.left)}>{order.status.title}</Typography>
            </th>
            <th className={styles.th}>
              <Typography variant="body-3">{order.date}</Typography>
            </th>
            <th className={styles.th}>
              <Typography variant="body-3" centered>{order.count}</Typography>
            </th>
            <th className={styles.th}>
              <Typography variant="body-3" className={cn(styles.bold, styles.left)}>
                {displayPrice(order.total_price)}
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          <tr>
            <td />
            <td colSpan={4} className={styles.productTd}>
              <Typography variant="body-3" color="grey-dark">
                {t('common:office.goods')}
                :
              </Typography>
            </td>
          </tr>
          {order.products.map((product, index) => (
          // eslint-disable-next-line react/no-array-index-key
            <tr key={index} className={styles.tr}>
              <td className={cn(styles.td, styles.paddedTd)}>
                <div className={styles.tdWrap}>
                  <Typography className={styles.bold} variant="body-3">{index + 1}</Typography>
                </div>
              </td>
              <td colSpan={2} className={styles.td}>
                <div className={styles.tdWrap}>
                  <OrderProductCard product={product} />
                </div>
              </td>
              <td className={styles.td}>
                <div className={styles.tdWrap}>
                  <Typography variant="body-3" centered color="grey-dark" className="mb-2">
                    {t('common:office.deduct_bonus')}
                    :
                  </Typography>
                  <Typography variant="body-3" centered className={styles.bold}>{product.bonus_deduction}</Typography>
                </div>
              </td>
              <td className={styles.td}>
                <div className={styles.tdWrap}>
                  <Typography variant="body-3" centered color="grey-dark" className="mb-2">
                    {t('common:office.goodsQty')}
                    :
                  </Typography>
                  <Typography variant="body-3" centered className={styles.bold}>{product.quantity}</Typography>
                </div>
              </td>
              <td className={styles.td}>
                <div className={styles.tdWrap}>
                  <Typography variant="body-3" color="grey-dark" className="mb-2">{t('office.price')}</Typography>
                  <Typography variant="body-3" className={styles.bold}>
                    {displayPrice(product.price)}
                  </Typography>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className={styles.tfoot}>
          {order?.address && (
            <tr>
              <td />
              <td>
                <Typography variant="body-3">
                  <span className={styles.bold}>
                    {t('checkout-page:checkout.delivery_address')}
                    :
                    {' '}
                  </span>
                  {`${order.address?.street ? `${order.address?.street},` : ''} ${order.address?.house ? `${order.address?.house},` : ''} ${order.address?.flat ? order.address?.flat : ''}`}
                </Typography>
              </td>
              <td />
            </tr>
          )}
          <tr>
            <td />
            <td colSpan={3}>
              <Typography variant="body-3">
                <span className={styles.bold}>
                  {t('checkout-page:checkout.payment')}
                  :
                  {' '}
                </span>
                {order.payment_method}
              </Typography>
            </td>
            <td>
              <Typography variant="body-3" color="grey-dark">
                {t('office.deduct_bonus')}
                :
              </Typography>
            </td>
          </tr>
          <tr>
            <td />
            <td colSpan={3}>
              <Typography variant="body-3">
                <span className={styles.bold}>
                  {t('common:office.status')}
                  :
                  {' '}
                </span>
                {order.status.title}
              </Typography>
            </td>
            <td>
              <Typography variant="body-3" color="grey-dark">
                {order.deduct_bonus}
              </Typography>
            </td>
          </tr>
          <tr>
            <td />
            <td colSpan={3}>
              <Typography variant="body-3">
                <span className={styles.bold}>
                  {t('checkout-page:checkout.delivery')}
                  :
                  {' '}
                </span>
                {order.delivery_method}
              </Typography>
            </td>
            <td>
              <Typography variant="body-3" color="grey-dark">
                {t('checkout-page:checkout.total')}
                :
              </Typography>
            </td>
          </tr>
          <tr>
            <td />
            <td colSpan={3} />
            <td>
              <Typography variant="body-3" color="grey-dark">
                {displayPrice(order.total_price)}
              </Typography>
            </td>
          </tr>
          <tr>
            <td />
            <td>
              <Button onClick={() => setIsHistoryOpen(true)} fullWidth size="medium" color="light-secondary" className={styles.btn}>
                {t(
                  'common:order-history.btn',
                )}
              </Button>
            </td>
            <td colSpan={2} />
            <td />
          </tr>
        </tfoot>
      </table>
      <OrderHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        orderHistory={order.histories}
      />
    </div>
  );
});
