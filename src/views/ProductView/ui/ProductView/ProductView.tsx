import { memo, useEffect } from 'react';
import cn from 'classnames';
import { Container } from '@/shared/ui/Container';
import { Breadcrumb, PageBreadcrumbs } from '@/shared/ui/Breadcrumps';
import { DetailedProduct, Product, useAddProductToHistoryAndGetHistoryMutation } from '@/entities/Product';
import { RecommendedProducts, HistoryProducts } from '@/widgets/ProductPresenter';
import styles from './ProductView.module.scss';
import { ProductDetailedCard } from '../ProductDetailedCard';
import { ProductSkusProvider } from '../ProductSkusProvider';
import { pushDataLayerEvent } from '@/shared/lib/analytics/dataLayer';
import { sendEsEvent } from '@/shared/lib/analytics/esputnik';
import { useProductSkus } from '../../lib/ProductSkusContext';

interface ProductViewProps {
  className?: string;
  product: DetailedProduct;
  breadcrumbs: Breadcrumb[];
  recommendations: Product[];
}

export const ProductView = memo(({
  product,
  breadcrumbs = [],
  recommendations = [],
  className,
}: ProductViewProps) => {
  const [addProductToHistory, { data: history }] = useAddProductToHistoryAndGetHistoryMutation();
  useEffect(() => {
    addProductToHistory({ productId: product.id });
  }, [addProductToHistory, product, product.id]);

  useEffect(() => {
    // is_sale means "in stock", not "discounted" — DetailedProduct has no separate stock flag.
    sendEsEvent('ProductPage', {
      productKey: product.id,
      price: product.price.value,
      isInStock: product.is_sale,
    });
  }, [product.id, product.price.value, product.is_sale]);

  return (
    <div className={cn(styles.root, className)}>
      <Container className={styles.container}>
        <PageBreadcrumbs breadcrumbs={breadcrumbs} className={styles.breadcrumps} />
        <ProductSkusProvider product={product}>
          <ProductDetailedCard className={styles.card} product={product} />
        </ProductSkusProvider>
        <RecommendedProducts products={recommendations} className={styles.slider} />
        <HistoryProducts products={history || []} className={styles.slider} />
      </Container>
    </div>
  );
});
