import cn from 'classnames';
import UserIcon from '@/shared/assets/icons/user.svg';
import FavoriteIcon from '@/shared/assets/icons/favorite.svg';
import CartIcon from '@/shared/assets/icons/cart.svg';
import { Svg } from '@/shared/ui/Svg';
import { cartSelectors, useCartActions } from '@/entities/Cart';
import { useAuth } from '@/entities/Session';
import { useRouter } from 'next/router';
import { routerPaths } from '@/shared/config/router';
import { useSelector } from 'react-redux';
import { wishListSelector } from '@/entities/WishList';
import { CountLabel } from '@/shared/ui/CountLabel';
import { useAuthModel } from '@/widgets/Auth';
import styles from './HeaderAuthActions.module.scss';

interface HeaderAuthActionsProps {
  className?: string;
}

export const HeaderAuthActions = ({ className }: HeaderAuthActionsProps) => {
  const { openLoginModal } = useAuthModel();
  const { push } = useRouter();
  const wishListProducts = useSelector(wishListSelector.getProducts);
  const quantity = useSelector(cartSelectors.getCartProductQuantity);
  const { openCart } = useCartActions();
  const { isAuth } = useAuth();
  const userClickHandler = () => {
    if (isAuth) {
      push(routerPaths.office);
    } else {
      openLoginModal();
    }
  };
  const cartClickHandler = () => {
    openCart();
  };

  const wishListClickHandler = () => {
    push(routerPaths.office_wishlist);
  };

  const showWishListButton = isAuth && wishListProducts.length > 0;
  return (
    <div className={cn(styles.root, className)}>
      <ul className={styles.list}>
        <li className={styles.list_item}>
          <button onClick={userClickHandler} className={styles.button} type="button">
            <Svg Icon={UserIcon} width="24" height="24" />
          </button>
        </li>
        {showWishListButton
        && (
          <li className={styles.list_item}>
            <button onClick={wishListClickHandler} className={styles.button} type="button">
              <Svg Icon={FavoriteIcon} width="19" height="16" />
              <CountLabel count={wishListProducts.length} className={styles.label} />
            </button>
          </li>
        )}
        <li className={styles.list_item}>
          <button onClick={cartClickHandler} className={styles.button} type="button" data-gtm-id="cart-open" data-gtm-event="click" data-gtm-action="open_cart">
            <Svg Icon={CartIcon} />
            <CountLabel count={quantity} className={styles.label} />
          </button>
        </li>
      </ul>
    </div>
  );
};
