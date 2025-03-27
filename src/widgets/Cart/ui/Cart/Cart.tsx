import { memo } from 'react';
import { useSelector } from 'react-redux';
import {
  CartDrawer,
  CartItem,
  cartSelectors,
  useCartActions,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from '@/entities/Cart';
import { PageLoader } from '@/shared/ui/Loader';
import { CartActions } from '../CartActions';
import styles from './Cart.module.scss';

interface CartProps {
  className?: string;
}

export const Cart = memo(({ className }: CartProps) => {
  const { closeCart } = useCartActions();
  const {
    cartData, isError, isOpen, isLoading,
  } = useSelector(cartSelectors.getCart);
  const quantity = useSelector(cartSelectors.getCartProductQuantity);
  const [updateCartQuantity, { isLoading: updateLoading }] = useUpdateProductMutation();
  const [deleteCartItem, { isLoading: deleteLoading }] = useDeleteProductMutation();
  const onClose = () => {
    closeCart();
  };

  const deleteHandler = (itemId: string) => {
    deleteCartItem({
      itemId,
    });
  };
  const addHandler = (currentQuantity: number) => (itemId: string) => {
    if (!cartData) return;
    updateCartQuantity({
      quantity: currentQuantity + 1,
      itemId,
    });
  };
  const reduceHandler = (currentQuantity: number) => (itemId: string) => {
    if (!cartData) return;
    if (currentQuantity === 1) {
      deleteCartItem({
        itemId,
      });
    } else {
      updateCartQuantity({
        quantity: currentQuantity - 1,
        itemId,
      });
    }
  };
  return (
    <>
      {(updateLoading || deleteLoading) && <PageLoader />}
      <CartDrawer
        isOpen={isOpen}
        className={className}
        isLoading={isLoading}
        isEmpty={quantity === 0 || isError}
        actions={
          <CartActions />
        }
        onClose={onClose}
      >
        <div className={styles.list}>
          {cartData?.items.map((item) => (
            <CartItem
              withCounter
              key={item.id}
              cartItem={item}
              onDelete={deleteHandler}
              onAdd={addHandler(item.quantity)}
              onRemove={reduceHandler(item.quantity)}
            />
          ))}
        </div>
      </CartDrawer>
    </>
  );
});
