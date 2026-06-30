import { createListenerMiddleware, isAnyOf, TypedStartListening } from '@reduxjs/toolkit';
import { StoreSchema } from '@/shared/types/store';
import { sendEsEvent } from '@/shared/lib/analytics/esputnik';
import { nextCartGuid } from '@/shared/lib/analytics/esputnikCartGuid';
import { cartApi } from '../../api/cartApi';

// eSputnik StatusCart payload — productKey is the parent product id (= feed <g:id>).
declare module '@/shared/lib/analytics/esputnik' {
  interface EsEventPayloadMap {
    StatusCart: {
      items: { productKey: string; price: number; quantity: number }[];
      guid?: string;
    };
  }
}

export const statusCartListener = createListenerMiddleware();

type AppStartListening = TypedStartListening<StoreSchema>;
const startListening = statusCartListener.startListening as AppStartListening;

// Emit an eSputnik StatusCart on every cart mutation, binding the post-mutation
// basket to a fresh GUID. Session hydration is intentionally excluded — StatusCart
// means "on change", not "on load" (see GUID protocol in the plan).
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

    const items = listenerApi.getState().cart.cartData?.items ?? [];
    const guid = nextCartGuid();

    sendEsEvent('StatusCart', {
      items: items.map((item) => ({
        productKey: item.parent_id || item.id,
        price: item.price.value,
        quantity: item.quantity,
      })),
      guid,
    });
  },
});
