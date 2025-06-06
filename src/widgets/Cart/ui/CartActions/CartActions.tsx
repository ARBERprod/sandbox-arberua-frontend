import { memo, useState } from 'react';
import cn from 'classnames';
import { Divider } from '@/shared/ui/Divider';
import { Flex } from '@/shared/ui/Flex';
import { Typography } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import { cartSelectors, useCartActions } from '@/entities/Cart';
import { useRouter } from 'next/router';
import { routerPaths } from '@/shared/config/router';
import { useSelector } from 'react-redux';
// import { useBuyInOneClick } from '@/features/cart/BuyInOneClick';
import { useTranslation } from 'next-i18next';
import styles from './CartActions.module.scss';
import { displayPrice } from '@/shared/lib/utils/displayPrice';
import { getUserDataForAnalytics } from '@/views/OfficeView/analytics/getUserDataForAnalytics';
import { useUser } from '@/entities/User';
import { measurementsPost, pushDataLayerEvent } from '@/shared/lib/analytics/dataLayer';
import { useUserId } from '@/entities/Session';
import { useInitiateCheckoutMutation } from '@/entities/Events';
import { getRandomEventId } from '@/shared/lib/utils/getRandomEventId';

interface CartActionsProps {
  className?: string;
}

export const CartActions = memo(({ className }: CartActionsProps) => {
  const { push } = useRouter();
  const cartData = useSelector(cartSelectors.getCartData);
  // const { setCartItems, openCart } = useBuyInOneClick();
  const { closeCart } = useCartActions();
  const { t } = useTranslation();
  const clientId = useUserId();
  const [checkoutEvent] = useInitiateCheckoutMutation();

  const user = useUser();
  const [eventId] = useState(() => getRandomEventId());

  const goToCheckout = async () => {
    const items = cartData?.items.map((item) => ({
      id: item.parent_id || item.id,
      name: item.title,
      category: item.category,
      brand: item.brand,
      variant: item.variant,
      price: item.cost.value,
      quantity: item.quantity,
      currency: 'UAH',
    }));

    const itemsMeasurements = cartData?.items.map((item) => ({
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
      price: item.cost.value || 0,
      quantity: item.quantity,
    }));

    const value = itemsMeasurements?.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const params = {
      currency: 'UAH',
      value: value || 0,
      items: itemsMeasurements,
    };

    const user_data = getUserDataForAnalytics(user);

    measurementsPost({
      name: 'begin_checkout',
      params,
      client_id: clientId,
    });

    pushDataLayerEvent({
      event: 'begin_checkout',
      event_id: eventId,
      ecommerce: {
        items,
      },
      ...(user_data && { user_data }),
    });

    if (typeof window !== 'undefined' && window?.fbq) {
      const paramsFbq = {
        value: cartData?.items.map((item) => item.cost.value).reduce((acc, item) => +acc + +item, 0),
        currency: 'UAH',
        content_ids: cartData?.items.map((item) => item.id),
        content_name: cartData?.items.map((item) => item.title),
        content_category: cartData?.items.map((item) => item.category),
        content_type: 'product',
      };
      // window?.fbq('track', 'InitiateCheckout', paramsFbq, { eventID: eventId });
      checkoutEvent({
        eventId,
      });
    }

    await push(routerPaths.checkout);
    closeCart();
  };
  // const oneClickHandler = () => {
  //   if (!cartData) return;
  //   closeCart();
  //   setCartItems(cartData.items);
  //   openCart();
  // };

  if (!cartData) return null;

  return (
    <div className={cn(styles.root, className)}>
      <Divider className={styles.divider} />
      {[...cartData.totals].reverse().map((item) => (
        <Flex key={item.title} justify="between" align="center">
          <Typography color="grey-dark" variant="body-2">{item.title}</Typography>
          <Typography variant="body-2" className={styles.price}>
            {displayPrice(item.price)}
          </Typography>
        </Flex>
      ))}
      <Button fullWidth size="large" onClick={goToCheckout}>{t('place_order')}</Button>
      {/* <Button */}
      {/*  fullWidth */}
      {/*  onClick={oneClickHandler} */}
      {/*  color="light-secondary" */}
      {/*  size="large" */}
      {/*  className={className} */}
      {/* > */}
      {/*  {t('buy_in_one_click')} */}
      {/* </Button> */}
    </div>
  );
});
