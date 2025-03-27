import { memo } from 'react';
import { CardView } from '@/shared/types/common';
import { Product } from '@/entities/Product';
import { CardsGrid } from '@/shared/ui/CardsGrid';
import { SingleProductCard } from '../SingleProductCard';

interface ProductsGridProps {
  className?: string;
  products: Product[];
  view: CardView;
}

export const ProductsGrid = memo(({
  products = [],
  view = CardView.NORMAL,
  className,
}: ProductsGridProps) => (
  <CardsGrid items={products} className={className} view={view}>
    {(product) => <SingleProductCard view={view} product={product} />}
  </CardsGrid>
));
