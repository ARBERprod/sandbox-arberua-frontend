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

    try {
      await Promise.all(itemIds.map((itemId) => deleteProduct({ itemId }).unwrap()));
      onRemoved();
    } catch {
      getNotify({ type: 'error', content: t('pickup.remove_item_error') }).notify();
    }
  }, [cartItems, deleteProduct, onRemoved, t]);
};
