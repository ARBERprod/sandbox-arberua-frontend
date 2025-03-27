import { memo } from 'react';
import { Product, ProductCard } from '@/entities/Product';
import { CardView } from '@/shared/types/common';
// import { BuyInOneClickButton } from '@/features/cart/BuyInOneClick';
import { ToggleWishListButton } from '@/features/wish-list/ToggleWishListButton';
import { AddToCardButton } from '@/features/cart/AddToCart';
import styles from './SingleProductCard.module.scss';
import cn from 'classnames';
import { PreorderProductButton } from '@/features/PreOrderProduct';

interface SingleProductCardProps {
    className?: string;
    product: Product;
    onAddProductToCart?: () => void;
    view?: CardView;
}

export const SingleProductCard = memo(({
  product,
  view,
  className,
  onAddProductToCart,
}: SingleProductCardProps) => {
  const isAbsent = product.skus?.every((sku) => !sku.is_sale);
  return (
    <ProductCard
      className={className}
      product={product}
      view={view}
      slots={{
        cartActions: ({ productId }) => (isAbsent ? (
          <PreorderProductButton
            className={styles.preorderBtn}
            buttonProps={{
              size: 'medium',
              color: 'light-primary',
            }}
            productId={productId}
          />
        ) : (
          <>
            {/* <BuyInOneClickButton */}
            {/*  productIds={[productId]} */}
            {/*  className={styles.btn} */}
            {/*  buttonProps={{ */}
            {/*    size: 'medium', */}
            {/*    color: 'light-primary', */}
            {/*  }} */}
            {/* /> */}
            <AddToCardButton
              className={styles.btn}
              onSuccess={onAddProductToCart}
              productId={productId}
              buttonProps={{
                size: 'medium',
                color: 'light-primary',
              }}
            />
          </>
        )),
        productActions: (productId) => (
          <ToggleWishListButton
            className={cn({ [styles.smallView]: view === 'small' })}
            withCount={Boolean(product.wishlists_count)}
            count={product.wishlists_count}
            productId={productId}
          />
        ),
      }}
    />
  );
});
