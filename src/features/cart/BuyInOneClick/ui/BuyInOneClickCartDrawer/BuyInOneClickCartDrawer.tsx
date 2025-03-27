import styles from './BuyInOneClickCartDrawer.module.scss';
import { CartDrawer, CartItem, CartSuccessModal } from '@/entities/Cart';
import { useSelector } from 'react-redux';
import { useBuyInOneClickCartActions } from '../../model/buyInOneClickCartSlice';
import { buyInOneClickCartSelectors } from '../../model/buyInOneClickCartSelectors';
import cn from 'classnames';
import { Divider } from '@/shared/ui/Divider';
import { Flex } from '@/shared/ui/Flex';
import { Typography } from '@/shared/ui/Typography';
import { displayPrice } from '@/shared/lib/utils/displayPrice';
import { BuyInOneClick } from '@/features/cart/BuyInOneClick';

interface BuyInOneClickCartDrawerProps {
  className?: string;
}

export const BuyInOneClickCartDrawer = ({ className }: BuyInOneClickCartDrawerProps) => {
  const {
    closeCart,
    removeItem,
    updateItemQuantity,
  } = useBuyInOneClickCartActions();

  const cartItems = useSelector(buyInOneClickCartSelectors.getCartItems);
  const isOpen = useSelector(buyInOneClickCartSelectors.getIsOpen);
  const onClose = () => {
    closeCart();
  };

  const deleteHandler = (itemId: string) => {
    removeItem({ itemId });
  };
  const addHandler = (currentQuantity: number) => (itemId: string) => {
    updateItemQuantity({
      quantity: currentQuantity + 1,
      itemId,
    });
  };
  const reduceHandler = (currentQuantity: number) => (itemId: string) => {
    if (currentQuantity === 1) {
      removeItem({
        itemId,
      });
    } else {
      updateItemQuantity({
        quantity: currentQuantity - 1,
        itemId,
      });
    }
  };
  return (
    <>
      <CartDrawer
        isOpen={isOpen}
        className={className}
        isEmpty={cartItems.length === 0}
        actions={(
          <div className={cn(styles.actions, className)}>
            <Divider className={styles.divider} />
            {([] as any[]).map((item) => (
              <Flex key={item.title} justify="between" align="center">
                <Typography color="grey-dark" variant="body-2">{item.title}</Typography>
                <Typography variant="body-2" className={styles.price}>
                  {displayPrice(item.price)}
                </Typography>
              </Flex>
            ))}
            <BuyInOneClick />
          </div>
        )}
        onClose={onClose}
      >
        <div className={styles.list}>
          {cartItems.map((item) => (
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
      <CartSuccessModal />
    </>
  );
};
