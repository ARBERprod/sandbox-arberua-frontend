import { memo } from 'react';
import cn from 'classnames';
import { CardView } from '@/shared/types/common';
import { ToggleWishListButton } from '@/features/wish-list/ToggleWishListButton';
import { Product, ProductCard } from '@/entities/Product';
import { FlexCol } from '@/shared/ui/Flex';
import {
  DeleteProductFromViewedButton,
} from '@/features/DeleteProductFromViewedButton';
import styles from './ViewedProductCard.module.scss';

interface ViewedProductCardProps {
  className?: string;
  product: Product;
}

export const ViewedProductCard = memo(({ className, product }:ViewedProductCardProps) => (
  <ProductCard
    className={cn(styles.root, className)}
    view={CardView.NORMAL}
    product={product}
    slots={{
      productActions: (productId) => (
        <FlexCol gap="12">
          <ToggleWishListButton productId={productId} />
          <DeleteProductFromViewedButton productId={productId} />
        </FlexCol>
      ),
    }}
  />
));
