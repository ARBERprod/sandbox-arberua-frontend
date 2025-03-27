import { memo } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { Product } from '@/entities/Product';
import { Typography } from '@/shared/ui/Typography';
import { ProductSlider } from '../ProductSlider';
import styles from './HistoryProducts.module.scss';

interface HistoryProductsProps {
  className?: string;
  products: Product[];
}

export const HistoryProducts = memo(({ className, products = [] }:HistoryProductsProps) => {
  const { t } = useTranslation();

  if (products.length === 0) return null;

  return (
    <div className={cn(styles.root, className)}>
      <Typography variant="title-2">
        {t('viewed')}
      </Typography>
      <ProductSlider className="mt-4" products={products} />
    </div>
  );
});
