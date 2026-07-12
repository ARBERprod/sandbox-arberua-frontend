import { useCallback } from 'react';
import { useTranslation } from 'next-i18next';
import { ICartItem, useDeleteProductMutation } from '@/entities/Cart';
import { getNotify } from '@/shared/ui/Notification';
import { resolveBlockedCartItemIds } from './resolveBlockedCartItemIds';

type UsePickupItemRemovalParams = {
  cartItems: ICartItem[] | undefined;
  // getPickupPoints is keyed by city_id and reads the cart server-side, so
  // dropping a cart item does not change the query args and won't auto-refetch —
  // the caller must pull a fresh availability so the item leaves unavailable_items.
  onRemoved: () => void;
};

export const usePickupItemRemoval = ({ cartItems, onRemoved }: UsePickupItemRemovalParams) => {
  const { t } = useTranslation('checkout-page');
  const [deleteProduct] = useDeleteProductMutation();

  return useCallback(async (productId: string) => {
    const itemIds = resolveBlockedCartItemIds(cartItems, productId);
    if (!itemIds.length) return;

    // allSettled, not all: a blocked product can map to several cart-item ids
    // (variants). If one delete fails the others may have succeeded, so refetch
    // whenever anything left the cart (availability re-derives off the smaller
    // cart) and still surface the error so the shopper can retry the remainder.
    const results = await Promise.allSettled(itemIds.map((itemId) => deleteProduct({ itemId }).unwrap()));
    if (results.some((r) => r.status === 'fulfilled')) onRemoved();
    if (results.some((r) => r.status === 'rejected')) {
      getNotify({ type: 'error', content: t('pickup.remove_item_error') }).notify();
    }
  }, [cartItems, deleteProduct, onRemoved, t]);
};
