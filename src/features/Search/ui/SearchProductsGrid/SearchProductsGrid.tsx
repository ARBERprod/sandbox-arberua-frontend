import { memo } from 'react';
import { ClothesItem, SmallProduct, SmallProductCard } from '@/entities/Product';
import cn from 'classnames';
import styles from './SearchProductsGrid.module.scss';

interface SearchProductsGridProps {
  className?: string;
  items?: SmallProduct[];
}

export const SearchProductsGrid = memo(({
  className,
  items,
}:SearchProductsGridProps) => (
  <div className={cn(styles.root, className)}>
    {items?.length && items.map((item) => (
      <SmallProductCard
        className={styles.item}
        key={item.id}
        product={item}
        imageSlot={(image) => (
          <ClothesItem
            image={image}
            size="vertical"
            className={styles.image}
            rounded
          />
        )}
        variant="search"
      />
    ))}
  </div>
));
