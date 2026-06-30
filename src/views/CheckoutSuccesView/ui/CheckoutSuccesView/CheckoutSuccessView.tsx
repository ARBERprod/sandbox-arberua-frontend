import {
  memo, useEffect, useRef, useState,
} from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { Container } from '@/shared/ui/Container';
import { Typography } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { routerPaths } from '@/shared/config/router';
import DoneIcon from '@/shared/assets/icons/check-2.svg';
import { Svg } from '@/shared/ui/Svg';
import styles from './CheckoutSuccesView.module.scss';
import { OrderDto } from '@/entities/Order';
import { ClothesItem, SmallProductCard } from '@/entities/Product';
import { getUserDataForAnalytics } from '@/views/OfficeView/analytics/getUserDataForAnalytics';
import { useAuth, useUserId } from '@/entities/Session';
import { getRandomEventId } from '@/shared/lib/utils/getRandomEventId';
import { User } from '@/entities/User';
import { measurementsPost, pushDataLayerEvent, pushGAdsEvent } from '@/shared/lib/analytics/dataLayer';
import { sendEsEvent } from '@/shared/lib/analytics/esputnik';
import { readPurchaseGuid, clearPurchaseGuid } from '@/shared/lib/analytics/esputnikCartGuid';

interface CheckoutSuccessViewProps {
  className?: string;
  order: OrderDto;
}

export const CheckoutSuccessView = memo(
  ({
    className,
    order,
  }: CheckoutSuccessViewProps) => {
    const { push } = useRouter();
    const { t } = useTranslation();
    const clientId = useUserId();

    const { userData } = useAuth();
    const [eventId] = useState(() => getRandomEventId());
    // Latch: PurchasedItems must fire at most once per mount. clientId/userData can
    // resolve after mount and re-run the effect, which would re-send with a stale
    // (already-cleared) GUID and double-count the order.
    const purchaseTracked = useRef(false);

    useEffect(() => {
      const fallbackUserData: User = {
        email: order.customer.email || '',
        phone: order.customer.phone || '',
        first_name: order.customer.first_name || '',
        last_name: order.customer.last_name || '',
        middle_name: order.customer.middle_name || '',
        bonus_balance: 0,
        sex: null,
        birthday: null,
        addresses: [
          {
            id: order.address?.id || '',
            index: '',
            house: order.address?.house || '',
            flat: order.address?.flat || '',
            street: order.address?.street || '',
            city: order.city || {},
            country: (order.address as any)?.country || undefined,
          },
        ],
        user_id: order.customer.id || '',
      };

      const orderInfo = {
        transaction_id: order.order_number,
        affiliation: 'Онлайн-магазин',
        value: order.cost.value,
        currency: 'UAH',
        tax: 0,
        shipping: 0,
        items: order.products.map((item) => ({
          id: item.parent_id || item.id,
          name: item.title,
          category: item.category,
          brand: item.brand,
          variant: item.variant,
          price: item.price.value,
          quantity: item.quantity,
          currency: 'UAH',
        })),
      };

      const itemsMeasurements = order.products.map((item) => ({
        item_id: item.parent_id || item.id,
        item_name: item.title,
        affiliation: 'Онлайн-магазин',
        // coupon: '',
        currency: 'UAH',
        // discount: '',
        // index: 0,
        item_brand: item.brand,
        item_category: item.category,
        // item_list_id: product.category.id,
        // item_list_name: product.category.title,
        item_variant: item.variant || '',
        price: item.price.value || 0,
        quantity: item.quantity,
      }));

      const value = itemsMeasurements?.reduce((acc, item) => acc + item.price * item.quantity, 0);

      const params = {
        currency: 'UAH',
        value: value || 0,
        items: itemsMeasurements,
        transaction_id: order.order_number,
        affiliation: 'Онлайн-магазин',
        tax: 0,
        shipping: 0,
      };

      const user_data = getUserDataForAnalytics(userData || fallbackUserData);

      measurementsPost({
        name: 'purchase',
        params,
        client_id: clientId,
      });

      pushDataLayerEvent({
        event: 'purchase',
        event_id: eventId,
        ecommerce: orderInfo,
        ...(user_data && { user_data }),
      });

      // Google Ads Dynamic Remarketing
      pushGAdsEvent({
        event: 'GAds_purchase',
        value: order.cost.value,
        items: order.products.map((item) => ({
          id: item.parent_id || item.id,
          google_business_vertical: 'retail',
        })),
      });

      if (typeof window !== 'undefined' && window?.fbq) {
        const paramsFbq = {
          value: order.products.map((item) => item.price.value).reduce((acc, item) => +acc + +item, 0),
          currency: 'UAH',
          content_ids: order.products.map((item) => item.id),
          content_name: order.products.map((item) => item.title),
          content_category: order.products.map((item) => item.category),
          content_type: 'product',
        };
        // window?.fbq('track', 'Purchase', paramsFbq, { eventID: order.id });
      }

      // eSputnik PurchasedItems bound to the order-submit GUID snapshot, then released.
      // Latched so a re-run (clientId/userData resolving late) cannot re-emit or send a
      // stale GUID after clearPurchaseGuid(). GA events above intentionally stay ungated.
      if (!purchaseTracked.current) {
        purchaseTracked.current = true;
        sendEsEvent('PurchasedItems', {
          items: order.products.map((item) => ({
            productKey: item.parent_id || item.id,
            price: item.price.value,
            quantity: item.quantity,
          })),
          OrderNumber: order.order_number,
          guid: readPurchaseGuid(),
        });
        clearPurchaseGuid();
      }
    }, [order, clientId, userData, eventId]);

    const goToHome = () => {
      push(routerPaths.main);
    };

    const productsCount = order.products.reduce((acc, product) => acc + product.quantity, 0);
    return (
      <div className={cn(styles.root, className)}>
        <Container className={styles.container}>
          <Flex className={styles.items}>
            <div className={cn(styles.item, styles.primary)}>
              <Svg Icon={DoneIcon} width={52} height={52} className={styles.icon} />

              <Typography className={styles.title} variant="title-3" weight={500}>
                {t('checkout.success.text_1')}
              </Typography>
              <Flex className={cn(styles.text_secondary, 'mt-5')} gap="6">
                <Typography variant="body-2" weight={400}>
                  {t('checkout.success.order_number')}
                </Typography>
                <Typography variant="body-2" weight={600}>
                  {order.order_number}
                </Typography>
              </Flex>

              <Flex className={cn(styles.text_secondary, 'mt-3')} gap="6">
                <Typography variant="body-2" weight={400}>
                  {t('checkout.success.order_date')}
                </Typography>
                <Typography variant="body-2" weight={600}>
                  {order.created_at}
                </Typography>
              </Flex>

              <Flex className={cn(styles.text_secondary, 'mt-3')} gap="6">
                <Typography variant="body-2" weight={400}>
                  {t('checkout.success.order_address_delivery')}
                </Typography>
                <Typography variant="body-2" weight={600}>
                  {order.city.title}
                  ,
                  {' '}
                  {order.delivery_method.title}
                </Typography>
              </Flex>

              <Typography className="mt-3" variant="body-2" weight={400}>
                {t('checkout.success.text_2')}
                {' '}
                <Link href={routerPaths.office_orders} className={styles.link}>
                  {t('checkout.success.text_3')}
                </Link>
              </Typography>
              <Typography className={styles.text} variant="title-5" weight={500}>
                {t('checkout.success.text_4')}
              </Typography>
              <Button
                fullWidth={false}
                size="large"
                className={styles.btn}
                onClick={goToHome}
              >
                {t('checkout.success.btn')}
              </Button>
            </div>

            {!!order.products.length && (
              <div className={cn(styles.item, styles.secondary)}>
                <div className={styles.item_inner}>
                  <Flex className={cn(styles.title_sum, 'mb-4')} gap="6" justify="between">
                    <Typography variant="title-5">
                      {t('checkout.success.your_order')}
                    </Typography>
                    <Typography variant="body-2" color="grey-dark">
                      {t('product', { count: productsCount })}
                    </Typography>
                  </Flex>
                  <div className={styles.products}>
                    {order.products.map((item) => (
                      <SmallProductCard
                        product={item}
                        imageSlot={(image) => (
                          <ClothesItem size="vertical" image={image} className={styles.image} />
                        )}
                        key={item.id}
                        className={styles.listItem}
                      />
                    ))}
                  </div>
                  <div className={styles.footer}>
                    {order.totals.filter((item) => Boolean(item.value))
                      .map((item) => (
                        <Flex key={item.title} justify="between">
                          <Typography color="grey-dark" variant="body-2">
                            {item.title}
                          </Typography>
                          <Typography variant="body-2">
                            {item.value}
                          </Typography>
                        </Flex>
                      ))}

                  </div>
                </div>
                <div className={styles.btn_wrap}>
                  <Button
                    fullWidth={false}
                    size="large"
                    className={cn(styles.btn, styles.secondary)}
                    onClick={goToHome}
                  >
                    {t('checkout.success.btn')}
                  </Button>
                </div>
              </div>
            )}
          </Flex>
        </Container>
      </div>
    );
  },
);
