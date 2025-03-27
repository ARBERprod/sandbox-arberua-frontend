import { memo, ReactNode, useCallback } from 'react';
import cn from 'classnames';
import { Checkbox } from '@/shared/ui/Form/Checkbox';
import { SmallProduct } from '../../model/types';
import { ClothesItem } from '../ClothesItem';
import { SmallProductCard } from '../SmallProductCard';
import styles from './ProductCardWithCheckbox.module.scss';

interface ProductCardWithCheckboxProps {
  className?: string;
  product: SmallProduct;
  value: boolean;
  onChange: (product:SmallProduct, bool:boolean)=> void;
  onBlur?: (name:string) => void;
  actions?: ReactNode;
}

export const ProductCardWithCheckbox = memo(({
  className,
  product,
  value,
  onChange,
  onBlur,
  actions,
}:ProductCardWithCheckboxProps) => {
  const changeHandler = useCallback((name: string, value: boolean) => {
    onChange(product, value);
  }, [onChange, product]);
  return (
    <div className={cn(styles.root, className)}>
      <Checkbox name={product.id} value={value} onChange={changeHandler} onBlur={onBlur} />
      <SmallProductCard
        className={styles.card}
        product={product}
        imageSlot={(image) => (
          <ClothesItem image={image} size="vertical" />
        )}
        actions={actions}
      />
    </div>
  );
});
