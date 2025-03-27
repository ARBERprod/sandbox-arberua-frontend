import { memo } from 'react';
import cn from 'classnames';
import { Product } from '@/entities/Product';
import { Flex } from '@/shared/ui/Flex';
import { Typography } from '@/shared/ui/Typography';
import Link from 'next/link';
import { NoSSR } from '@/shared/lib/components/NoSSR';
import { useTranslation } from 'next-i18next';
import styles from './RecommendedProducts.module.scss';
import { ProductSlider } from '../ProductSlider';

interface RecommendedProductsProps {
  className?: string;
  products: Product[];
  title?: string;
  viewAllLink?: string;
}

export const RecommendedProducts = memo(({
  products = [],
  className,
  title,
  viewAllLink,
}: RecommendedProductsProps) => {
  const { t } = useTranslation();

  const getTitle = () => title || `${t('recommended')}`;

  if (products.length === 0) return null;

  return (
    <div className={cn(styles.root, className)}>
      <Flex justify="between" align="center">
        <NoSSR>
          <Typography variant="title-2">
            {getTitle()}
          </Typography>
        </NoSSR>
        {viewAllLink && (
          <Link href={viewAllLink}>
            <Typography as="span" variant="body-2">
              {' '}
              {t('view_all')}
            </Typography>
          </Link>
        )}
      </Flex>
      <ProductSlider className="mt-4" products={products} />
    </div>
  );
});
