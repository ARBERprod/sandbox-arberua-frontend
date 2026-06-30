import { memo } from 'react';
import cn from 'classnames';
import { Svg } from '@/shared/ui/Svg';
import { Typography } from '@/shared/ui/Typography';
import HeartIcon from '@/shared/assets/icons/heart.svg';
import FilledHeartIcon from '@/shared/assets/icons/heart-filled.svg';
import { useToggleProductInWishListMutation, wishListSelector } from '@/entities/WishList';
import { Portal } from '@/shared/ui/Portal';
import { PageLoader } from '@/shared/ui/Loader';
import { Flex } from '@/shared/ui/Flex';
import { useAuth } from '@/entities/Session';
import { useSelector } from 'react-redux';
import { useAuthModel } from '@/widgets/Auth';
import { sendEsEvent } from '@/shared/lib/analytics/esputnik';
import styles from './ToggleWishListButton.module.scss';

interface ToggleWishListButtonProps {
  productId: string | string[];
  withCount?: boolean;
  count?: number;
  variant?: 'icon' | 'outlined';
  className?: string;
}

export const ToggleWishListButton = memo(({
  className,
  count,
  withCount,
  variant = 'icon',
  productId,
}: ToggleWishListButtonProps) => {
  const [toggleProduct, { isLoading }] = useToggleProductInWishListMutation();
  const wishListProducts = useSelector(wishListSelector.getProducts);
  const { isAuth } = useAuth();
  const { openLoginModal } = useAuthModel();
  const clickHandler = async () => {
    if (!isAuth) {
      openLoginModal();
      return;
    }
    if (Array.isArray(productId)) {
      // Add many product to wish list;
      return;
    }
    // Toggle returns the full list; an add is a not-in-list → in-list transition.
    const wasInList = wishListProducts.some((product) => product.id === productId);
    try {
      const updatedList = await toggleProduct({ product_id: productId }).unwrap();
      const added = updatedList.find((product) => product.id === productId);
      if (!wasInList && added) {
        sendEsEvent('AddToWishlist', {
          productKey: added.parent_id ?? added.id,
          price: added.price.value,
        });
      }
    } catch {
      // Toggle failed; nothing to track (analytics is fire-and-forget).
    }
  };
  const isActive = Boolean(wishListProducts.find((product) => product.id === productId));
  const iconDimensions = variant === 'outlined' ? { width: 28, height: 28 } : {};
  return (
    <>
      {isLoading
        && (
          <Portal mountInBody>
            <PageLoader />
          </Portal>
        )}
      <Flex gap="4" align="center" className={cn(styles.root, styles[variant], className)}>
        {withCount
          && (
            <Typography variant="body-3">
              {count}
            </Typography>
          )}
        <button onClick={clickHandler} className={styles.button}>
          <Svg
            {...iconDimensions}
            fill="black"
            stroke={isActive ? 'black' : undefined}
            Icon={isActive ? FilledHeartIcon : HeartIcon}
          />
        </button>
      </Flex>
    </>
  );
});
