import { FC, memo } from 'react';
import cn from 'classnames';
import { Product } from '@/entities/Product';
import styles from './OfficeProductsGrid.module.scss';

interface OfficeProductsGridProps {
  className?: string;
  products: Product[];
  ProductCard: FC<{ className?: string, product: Product }>;
}

export const OfficeProductsGrid = memo(({
  products = [],
  className,
  ProductCard,
}: OfficeProductsGridProps) => (
  <div className={cn(styles.root, className)}>
    {products.map(
      (product) => (
        <ProductCard
          className={styles.product}
          product={product}
          key={product.id}
        />
      ),
    )}
  </div>
));
