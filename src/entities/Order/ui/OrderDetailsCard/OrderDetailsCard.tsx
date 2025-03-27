import { memo } from 'react';
import cn from 'classnames';
import { ExpandableCard } from '@/shared/ui/ExpandableCard';
import { Flex, FlexCol } from '@/shared/ui/Flex';
import { Typography } from '@/shared/ui/Typography';
import { Divider } from '@/shared/ui/Divider';
import { Button } from '@/shared/ui/Button';
import { useTranslation } from 'next-i18next';
import { OrderProductCard } from '../OrderProductCard';
import styles from './OrderDetailsCard.module.scss';
import { Order } from '../../model/types';
import { displayPrice } from '@/shared/lib/utils/displayPrice';

interface OrderDetailsCardProps {
  className?: string;
  order: Order;
}

export const OrderDetailsCard = memo(({ order, className }:OrderDetailsCardProps) => {
  const { t } = useTranslation(['common', 'checkout-page']);
  return (
    <ExpandableCard
      className={cn(styles.root, className)}
      expandContent={(
        <div className={styles.details}>
          <Divider className="mt-4" />
          <Typography className="mt-6" variant="body-3" color="grey-dark">
            {t('common:office.goods')}
            :
          </Typography>
          <FlexCol gap="16" as="ul" className={styles.list}>
            {order.products.map((product, index) => (
              <li key={product.id}>
                <div className={styles.productWrap}>
                  <Typography className={styles.index} weight={500} variant="body-3" as="span">{index + 1}</Typography>
                  <OrderProductCard product={product} withDetails />
                </div>
                <Divider className="mt-3" />
              </li>
            ))}
          </FlexCol>
          <FlexCol gap="12">
            <Typography variant="body-3" weight={500}>
              {t('checkout-page:checkout.payment')}
              :
              {' '}
              <Typography variant="body-3" weight={500} as="span">{order.payment_method}</Typography>
            </Typography>
            <Typography variant="body-3" weight={500}>
              {t('common:office.status')}
              :
              {' '}
              <Typography variant="body-3" weight={500} as="span">{order.status.title}</Typography>
            </Typography>
            <Typography variant="body-3" weight={500}>
              {t('checkout-page:checkout.delivery')}
              :
              {' '}
              <Typography variant="body-3" weight={500} as="span">{order.delivery_method}</Typography>
            </Typography>
            {order.address && (
              <Typography variant="body-3" weight={500}>
                {t('checkout-page:checkout.delivery_address')}
                :
                {' '}
                <Typography variant="body-3" weight={500} as="span">{`${order.address?.street}, ${order.address?.house}, ${order.address?.flat}`}</Typography>
              </Typography>
            )}
            <Typography variant="body-3" weight={500}>
              {t('common:office.deduct_bonus')}
              :
            </Typography>
            <Typography variant="body-3" color="grey-dark">
              {order?.deduct_bonus}
            </Typography>
            <Flex gap="8" align="center">
              <Typography color="grey-dark" variant="body-3">
                {t('checkout-page:checkout.total')}
                :
              </Typography>
              <Typography variant="title-6">
                {displayPrice(order.total_price)}
              </Typography>
            </Flex>
          </FlexCol>
          <FlexCol gap="12" align="start" className="mt-5">
            <Button className={styles.btn} color="light-secondary">{t('common:order-history.btn')}</Button>
            <Button className={styles.btn}>{t('common:repeat-order.btn')}</Button>
          </FlexCol>
        </div>
      )}
    >
      <FlexCol gap="12">
        <Flex gap="16">
          <Typography variant="body-3" weight={500}>
            {t('common:office.id')}
            :
          </Typography>
          <Typography variant="body-3" color="grey-dark">{order.order_number}</Typography>
        </Flex>
        <Flex gap="16">
          <Typography variant="body-3" weight={500}>
            {t('common:office.status')}
            :
          </Typography>
          <Flex as="span" gap="8" align="center">
            <div className={styles.statusCircle} style={{ backgroundColor: order.status.color }} />
            <Typography variant="body-3" color="grey-dark">
              {order.status.title}
            </Typography>
          </Flex>
        </Flex>
        <Flex gap="16">
          <Typography variant="body-3" weight={500}>
            {t('common:office.date')}
            :
          </Typography>
          <Typography variant="body-3" color="grey-dark">{order.date}</Typography>
        </Flex>
        <Flex gap="16" align="center">
          <Typography variant="body-3" weight={500}>
            {t('common:office.goodsQty')}
            :
          </Typography>
          <Typography variant="body-3" color="grey-dark">{order.count}</Typography>
        </Flex>
        <Flex gap="16">
          <Typography variant="body-3" weight={500}>
            {t('common:office.summ')}
            :
          </Typography>
          <Typography variant="body-3" color="grey-dark">
            {displayPrice(order.total_price)}
          </Typography>
        </Flex>
      </FlexCol>
    </ExpandableCard>
  );
});
