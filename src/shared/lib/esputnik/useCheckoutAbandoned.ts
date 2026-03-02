import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { cartSelectors } from '@/entities/Cart';
import { useAuth } from '@/entities/Session';
import type { EsputnikCartItem, EsputnikEventPayload } from './types';
import { ESPUTNIK_API_ROUTES, ESPUTNIK_EVENTS } from './constants';

// Track when a logged-in user enters checkout and leaves without completing
export function useCheckoutAbandoned() {
  const { userData } = useAuth();
  const cartItems = useSelector(cartSelectors.getCartItems);
  const cartData = useSelector(cartSelectors.getCartData);
  const sentRef = useRef(false);

  useEffect(() => {
    if (!userData?.email || cartItems.length === 0) return;

    sentRef.current = false;

    const handleBeforeUnload = () => {
      if (sentRef.current) return;
      sentRef.current = true;

      const items: EsputnikCartItem[] = cartItems.map((item) => ({
        sku: item.id,
        name: item.title,
        qty: item.quantity,
        price: item.price.value,
        product_url: item.url,
        image_url: typeof item.picture === 'string' ? item.picture : undefined,
      }));

      const payload: EsputnikEventPayload = {
        eventKey: ESPUTNIK_EVENTS.CHECKOUT_ABANDONED,
        email: userData.email,
        externalCustomerId: userData.user_id,
        eventData: {
          cart_url: `${window.location.origin}/checkout`,
          cart_total: String(cartData?.total || 0),
          currency: 'UAH',
          items: JSON.stringify(items),
          last_activity_at: new Date().toISOString(),
        },
      };

      // Use sendBeacon for reliable delivery during page unload
      if (navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
        navigator.sendBeacon(ESPUTNIK_API_ROUTES.EVENT, blob);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [userData, cartItems, cartData]);

  // Call this when checkout is completed to prevent abandonment event
  const markCheckoutCompleted = () => {
    sentRef.current = true;
  };

  return { markCheckoutCompleted };
}
