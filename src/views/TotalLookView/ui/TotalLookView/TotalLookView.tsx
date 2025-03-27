import { memo, useCallback, useEffect } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { PageBreadcrumbs } from '@/shared/ui/Breadcrumps';
import { Container } from '@/shared/ui/Container';
import { Flex } from '@/shared/ui/Flex';
import { RecommendedProducts } from '@/widgets/ProductPresenter';
import { useGetTotalLookQuery } from '@/entities/TotalLook';
import { PageLoader } from '@/shared/ui/Loader';
import { ErrorMessage } from '@/shared/ui/Form/ErrorMessage';
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader';
import { totalLookViewReducer, useTotalLookViewActions } from '../../model/slices/totalLookViewSlice';
import { TotalLookViewSidebar } from '../TotalLookViewSidebar';
import styles from './TotalLookView.module.scss';
import { AppImage } from '@/shared/ui/AppImage';
import { SmallProduct } from '@/entities/Product';

interface TotalLookViewProps {
  className?: string;
}

export const TotalLookView = memo(({ className }:TotalLookViewProps) => {
  const { query } = useRouter();
  const { setProducts, selectSku } = useTotalLookViewActions();
  const { data, isLoading, isError } = useGetTotalLookQuery({ slug: query.slug as string });

  const setInitialProductSkus = useCallback((products: SmallProduct[]) => {
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const availableSku = product.skus?.find((sku) => sku.is_sale);
      if (availableSku) {
        selectSku({ productId: product.id, sku: availableSku || null });
      }
    }
  }, [selectSku]);

  useEffect(() => {
    if (data) {
      setProducts(data.look.products);
      setInitialProductSkus(data.look.products);
    }
  }, [data, setInitialProductSkus, setProducts]);
  if (isLoading) return <PageLoader />;
  if (isError || !data) return <ErrorMessage error="error" />;
  const { look, breadcrumbs } = data;
  return (
    <DynamicModuleLoader reducers={{ totalLookView: totalLookViewReducer }}>
      <div className={cn(styles.root, className)}>
        <Container className={styles.container}>
          <Flex justify="center">
            <PageBreadcrumbs breadcrumbs={breadcrumbs} className={styles.breadcrumbs} />
          </Flex>

          <div className={styles.wrapper}>
            <div className={styles.image}>
              <AppImage unoptimized alt={look.title} src={look.picture} />
            </div>
            <TotalLookViewSidebar look={look} className={styles.sidebar} />
          </div>

          <RecommendedProducts products={[]} className={styles.recommended} />
        </Container>
      </div>
    </DynamicModuleLoader>
  );
});
