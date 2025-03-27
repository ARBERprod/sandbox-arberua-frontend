import { memo, useCallback, useEffect } from 'react';
import cn from 'classnames';
import { useGetSearchedProductsQuery } from '@/views/SearchView';
import { useRouter } from 'next/router';
import { CatalogActions } from '@/widgets/CatalogActions';
import { routerPaths } from '@/shared/config/router';
import { ProductsGrid } from '@/widgets/ProductPresenter';
import { Container } from '@/shared/ui/Container';
import { CardView } from '@/shared/types/common';
import { PageLoader } from '@/shared/ui/Loader';
import { Redirect } from '@/shared/lib/components/Redirect';
import { Typography } from '@/shared/ui/Typography';
import { Pagination } from '@/shared/ui/Pagination';
import { useTranslation } from 'next-i18next';
import { COOKIE_VIEW_KEY } from '@/shared/constants/common';
import { useSelector } from 'react-redux';
import { UISelectors, useUIActions } from '@/entities/UI';
import { cookieService } from '@/shared/lib/services/cookie.service';
import styles from './SearchView.module.scss';
import { usePaginate } from '@/widgets/CatalogPagination';
import { FilterUtils } from '@/entities/Filter';
import { measurementsPost, pushDataLayerEvent } from '@/shared/lib/analytics/dataLayer';
import { useUserId } from '@/entities/Session';

interface SearchViewProps {
  className?: string;
}

export const SearchView = memo(({ className }:SearchViewProps) => {
  const { query } = useRouter();
  const queryString = query.q as string;
  const { pageChangeHandler, page } = usePaginate();
  const filters = FilterUtils.getFiltersStringFromQuery(query);
  console.log('filters', filters);
  const {
    data,
    isLoading,
    isError,
  } = useGetSearchedProductsQuery({
    query: queryString,
    page,
    filters,
    sort: query.sort as string || '',
  });
  const view = useSelector(UISelectors.getGlobalView);
  const { setView } = useUIActions();
  const clientId = useUserId();

  useEffect(() => {
    if (data?.data?.products) {
      const items = data.data.products.map((product) => ({
        id: product.id,
        name: product.title,
        price: product.price.value,
        category: product.category,
        variant: product?.skus?.[0]?.title || '',
        currency: 'UAH',
        quantity: 1,
        url: product.url,
        image: product.pictures?.[0] || '',
        brand: product.brand,
      }));

      console.log('data', data);

      const itemsMeasurements = data.data.products.map((product, index) => ({
        item_id: product.id,
        item_name: product.title,
        affiliation: 'Онлайн-магазин',
        // coupon: '',
        currency: 'UAH',
        // discount: '',
        index,
        item_brand: product.brand,
        item_category: product.category,
        // item_list_id: product.category.id,
        // item_list_name: product.category.title,
        item_variant: product?.skus?.[0]?.title || '',
        price: product.price.value,
        quantity: 1,
      }));

      const params = {
        items: itemsMeasurements,
        // item_list_id: product.category.id,
        // item_list_name: product.category.title,
      };

      pushDataLayerEvent({
        event: 'view_item_list',
        ecommerce: {
          items,
        },
      });

      measurementsPost({
        name: 'view_item_list',
        params,
        client_id: clientId,
      });
    }
  }, [data, clientId]);

  const { t } = useTranslation();

  const viewChangeHandler = useCallback((view: CardView) => {
    setView(view);
    cookieService.set(COOKIE_VIEW_KEY, view);
  }, [setView]);

  if (isLoading) return <PageLoader />;

  if (isError || !data) return <Redirect path={routerPaths.main} replace />;

  return (
    <div className={cn(styles.root, className)}>
      <Container>
        <Typography centered variant="body-1" className="mb-6">
          {t('results-request')}
          {' '}
          &quot;
          {data.data.markup.title}
          &quot;
          {' '}
          (
          {data.meta.total}
          )
        </Typography>
        <CatalogActions
          filtersMode="query"
          sortOptions={data.data.sorter}
          basePath={routerPaths.search}
          filters={data.data.filters}
          view={view}
          onViewChange={viewChangeHandler}
        />
        <ProductsGrid className={styles.grid} products={data.data.products} view={view} />
        <Pagination
          className={styles.pagination}
          pageCount={data.meta.page.total}
          onPageChange={pageChangeHandler}
          activePage={data.meta.page.current}
        />
      </Container>
    </div>
  );
});
