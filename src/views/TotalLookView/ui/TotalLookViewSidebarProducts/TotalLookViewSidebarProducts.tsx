import { memo } from 'react';
import cn from 'classnames';
import { SmallProduct } from '@/entities/Product';

import styles from './TotalLookViewSidebarProducts.module.scss';
import { TotalLookViewSidebarProduct } from '../TotalLookViewSidebarProduct';

interface TotalLookViewSidebarProductsProps {
  className?: string;
  products: SmallProduct[];
}

export const TotalLookViewSidebarProducts = memo(({ className, products }:TotalLookViewSidebarProductsProps) => (
  <ul className={cn(styles.root, className)}>
    {products && products.map((product) => (
      <li className={styles.product} key={product.id}>
        <TotalLookViewSidebarProduct product={product} />
      </li>
    ))}
  </ul>
));
