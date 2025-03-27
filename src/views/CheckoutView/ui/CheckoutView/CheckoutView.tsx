import { memo } from 'react';
import cn from 'classnames';
import { Container } from '@/shared/ui/Container';
import { Checkout } from '@/widgets/Checkout';
import styles from './CheckoutView.module.scss';
import { useSelector } from 'react-redux';
import { cartSelectors } from '@/entities/Cart';
import { Redirect } from '@/shared/lib/components/Redirect';
import { routerPaths } from '@/shared/config/router';

interface CheckoutViewProps {
    className?: string;
}

export const CheckoutView = memo(({ className }: CheckoutViewProps) => {
  const cartItems = useSelector(cartSelectors.getCartItems);
  const cartLoading = useSelector(cartSelectors.getCartIsLoading);
  if (!cartLoading && cartItems.length === 0) return <Redirect path={routerPaths.main} />;

  return (
    <div className={cn(styles.root, className)}>
      <Container className={styles.container}>
        <Checkout />
      </Container>
    </div>
  );
});
