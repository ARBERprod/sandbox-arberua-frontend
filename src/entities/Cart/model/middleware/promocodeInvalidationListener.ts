import { createListenerMiddleware, isAnyOf, TypedStartListening } from '@reduxjs/toolkit';
import i18next from 'i18next';
import { getNotify } from '@/shared/ui/Notification';
import { StoreSchema } from '@/shared/types/store';
import { cartApi } from '../../api/cartApi';

export const promocodeInvalidationListener = createListenerMiddleware();

type AppStartListening = TypedStartListening<StoreSchema>;
const startListening = promocodeInvalidationListener.startListening as AppStartListening;

// Fire a toast when an implicit cart mutation (add/update/delete) silently
// drops the applied promocode. Explicit apply/remove are excluded — those are
// user-initiated and surface via the form state, not via a toast.
startListening({
  matcher: isAnyOf(
    cartApi.endpoints.addProductToCart.matchFulfilled,
    cartApi.endpoints.addManyProductsToCart.matchFulfilled,
    cartApi.endpoints.updateProduct.matchFulfilled,
    cartApi.endpoints.deleteProduct.matchFulfilled,
    cartApi.endpoints.deleteCart.matchFulfilled,
  ),
  effect: (_action, listenerApi) => {
    if (typeof window === 'undefined') return;

    const prev = listenerApi.getOriginalState().cart.cartData?.promocode ?? null;
    const next = listenerApi.getState().cart.cartData?.promocode ?? null;

    if (prev !== null && next === null) {
      const { notify } = getNotify({
        type: 'info',
        content: i18next.t('checkout-page:promocode.toast.cart_changed', {
          defaultValue: 'Кошик змінено, додайте промокод повторно',
        }) as string,
      });
      notify();
    }
  },
});
