import { memo } from 'react';
import cn from 'classnames';
import { Product, ProductCard } from '@/entities/Product';
import { CardView } from '@/shared/types/common';
import { ToggleWishListButton } from '@/features/wish-list/ToggleWishListButton';
import styles from './WishListProductCard.module.scss';

interface WishListProductCardProps {
  className?: string;
  product: Product;
}

export const WishListProductCard = memo(({ className, product }:WishListProductCardProps) => (
  <ProductCard
    className={cn(styles.root, className)}
    view={CardView.NORMAL}
    product={product}
    slots={{
      productActions: (productId) => (
        <ToggleWishListButton productId={productId} />
      ),
    }}
  />
));
