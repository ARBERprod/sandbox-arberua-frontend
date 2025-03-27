import { memo } from 'react';
import {
  ClothesItem, SmallProduct, SmallProductCard,
} from '@/entities/Product';

interface ChosenLookItemProps {
  className?: string;
  product: SmallProduct;
}

export const ChosenLookItem = memo(({ className, product }:ChosenLookItemProps) => (
  <SmallProductCard
    className={className}
    product={product}
    imageSlot={(image) => <ClothesItem image={image} size="md" />}
  />
));
