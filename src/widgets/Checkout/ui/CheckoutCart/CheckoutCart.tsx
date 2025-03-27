import { memo } from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { Flex, FlexCol } from '@/shared/ui/Flex';
import { Typography } from '@/shared/ui/Typography';
import { CartItem, cartSelectors } from '@/entities/Cart';
import { Loader } from '@/shared/ui/Loader';
import { ErrorMessage } from '@/shared/ui/Form/ErrorMessage';
import { useTranslation } from 'next-i18next';
import styles from './CheckoutCart.module.scss';
import { displayPrice } from '@/shared/lib/utils/displayPrice';
import { PromoCodeForm } from '@/features/PromoCodeForm';

interface CheckoutCartProps {
    className?: string;
}

export const CheckoutCart = memo(({
  className,
}: CheckoutCartProps) => {
  const { cartData, isError, isLoading } = useSelector(cartSelectors.getCart);
  const quantity = useSelector(cartSelectors.getCartProductQuantity);
  const { t } = useTranslation(['common', 'checkout-page']);
  const cartProducts = useSelector(cartSelectors.getCartItems);
  if (isLoading) return <Loader />;
  if (isError || !cartData) return <ErrorMessage error="Error" />;
  return (
    <div className={cn(styles.root, className)}>
      <Flex justify="between" align="center">
        <Typography variant="title-5">{t('checkout-page:checkout.order')}</Typography>
        <Typography color="grey-dark" variant="body-2">
          {t('checkout-page:checkout.text', { count: quantity })}
        </Typography>
      </Flex>
      <div className={styles.body}>
        <FlexCol gap="16" className={styles.list}>
          {cartProducts.map((item) => <CartItem cartItem={item} key={item.id} />)}
        </FlexCol>
        <PromoCodeForm />
      </div>
      <div className={styles.footer}>
        {cartData.totals.filter((item) => Boolean(item.price))
          .map((item) => (
            <Flex justify="between" key={item.title}>
              <Typography color="grey-dark" variant="body-2">{item.title}</Typography>
              <Typography variant="body-2">
                {displayPrice(item.price)}
              </Typography>
            </Flex>
          ))}
      </div>
    </div>
  );
});
