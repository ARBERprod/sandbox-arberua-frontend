import { memo, useEffect } from 'react';
import cn from 'classnames';
import { Container } from '@/shared/ui/Container';
import { Checkout } from '@/widgets/Checkout';
import styles from './CheckoutView.module.scss';
import { useSelector } from 'react-redux';
import { cartSelectors } from '@/entities/Cart';
import { Redirect } from '@/shared/lib/components/Redirect';
import { routerPaths } from '@/shared/config/router';
import { sessionFetch } from '@/entities/Session';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';

interface CheckoutViewProps {
    className?: string;
}

export const CheckoutView = memo(({ className }: CheckoutViewProps) => {
  const dispatch = useAppDispatch();
  const cartItems = useSelector(cartSelectors.getCartItems);
  const cartLoading = useSelector(cartSelectors.getCartIsLoading);

  // Refetch session on checkout page load to get actual prices
  useEffect(() => {
    dispatch(sessionFetch.initiate(undefined, { forceRefetch: true }));
  }, [dispatch]);

  if (!cartLoading && cartItems.length === 0) return <Redirect path={routerPaths.main} />;

  return (
    <div className={cn(styles.root, className)}>
      <Container className={styles.container}>
        <Checkout />
      </Container>
    </div>
  );
});
