import { useAddManyProductsToCartMutation, useAddProductToCartMutation, useCartActions } from '@/entities/Cart';
import { useCallback, useMemo } from 'react';

export const useAddToCart = (productId: string | string[], onSuccess?: () => void) => {
  const { openCart } = useCartActions();
  const [addProductToCart, { isLoading }] = useAddProductToCartMutation();
  const [addProductsToCart, { isLoading: manyLoading }] = useAddManyProductsToCartMutation();

  const clickHandler = useCallback(async (eventId: string) => {
    if (Array.isArray(productId)) {
      await addProductsToCart({ product_ids: productId });
    } else {
      await addProductToCart({
        quantity: 1,
        product_id: productId,
        eventId,
      });
    }
    openCart();
    onSuccess?.();
  }, [addProductToCart, addProductsToCart, onSuccess, openCart, productId]);

  const isDisabled = useMemo(() => Array.isArray(productId) && productId.length === 0, [productId]);

  return {
    clickHandler,
    isLoading: isLoading || manyLoading,
    isDisabled,
  };
};
