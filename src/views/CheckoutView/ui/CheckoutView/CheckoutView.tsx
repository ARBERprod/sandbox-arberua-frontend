import { memo, useEffect } from 'react';
import cn from 'classnames';
import { Container } from '@/shared/ui/Container';
import { Checkout } from '@/widgets/Checkout';
import styles from './CheckoutView.module.scss';
import { useSelector } from 'react-redux';
import { cartSelectors, useMarkCheckoutStartedMutation } from '@/entities/Cart';
import { Redirect } from '@/shared/lib/components/Redirect';
import { routerPaths } from '@/shared/config/router';
import { refetchSession, sessionSelectors } from '@/entities/Session';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';

interface CheckoutViewProps {
    className?: string;
}

export const CheckoutView = memo(({ className }: CheckoutViewProps) => {
  const dispatch = useAppDispatch();
  const [markCheckoutStarted] = useMarkCheckoutStartedMutation();
  const cartItems = useSelector(cartSelectors.getCartItems);
  const cartLoading = useSelector(cartSelectors.getCartIsLoading);
  const isSessionLoaded = useSelector(sessionSelectors.getIsSessionDataLoaded);

  useEffect(() => {
    dispatch(refetchSession());
  }, [dispatch]);

  // Track checkout page visit for eSputnik abandoned checkout detection.
  // Waits for session to load to ensure CSRF token is available.
  const hasCartItems = cartItems.length > 0;
  useEffect(() => {
    if (isSessionLoaded && hasCartItems) {
      markCheckoutStarted().unwrap().catch(() => {});
    }
  }, [isSessionLoaded, hasCartItems, markCheckoutStarted]);

  if (!cartLoading && cartItems.length === 0) return <Redirect path={routerPaths.main} />;

  return (
    <div className={cn(styles.root, className)}>
      <Container className={styles.container}>
        <Checkout />
      </Container>
    </div>
  );
});
