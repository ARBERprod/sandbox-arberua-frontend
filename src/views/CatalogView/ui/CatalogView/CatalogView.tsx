import { memo, useCallback, useEffect } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { CardView } from '@/shared/types/common';
import { Container } from '@/shared/ui/Container';
import { PageBreadcrumbs } from '@/shared/ui/Breadcrumps';
import { CategorySlider } from '@/widgets/CategorySlider';
import { ProductsGrid } from '@/widgets/ProductPresenter';
import { routerPaths } from '@/shared/config/router';
import { Category } from '@/entities/Category';
import { PageLoader } from '@/shared/ui/Loader';
import { CatalogActions } from '@/widgets/CatalogActions';
import { CatalogPagination, usePaginate } from '@/widgets/CatalogPagination';
import { COOKIE_VIEW_KEY } from '@/shared/constants/common';
import { useSelector } from 'react-redux';
import { UISelectors, useUIActions } from '@/entities/UI';
import { cookieService } from '@/shared/lib/services/cookie.service';
import { getIsSubCategory } from '../../lib/getIsSubCategory';
import { useGetCatalogQuery } from '../../api/catalogApi';
import styles from './CatalogView.module.scss';
import { FilterUtils } from '@/entities/Filter';
import { ErrorMessage } from '@/shared/ui/Form/ErrorMessage';
import { measurementsPost, pushDataLayerEvent, pushGAdsEvent } from '@/shared/lib/analytics/dataLayer';
import { useUserId } from '@/entities/Session';

interface CatalogViewProps {
  className?: string;
}

export const CatalogView = memo(({ className }: CatalogViewProps) => {
  const {
    push,
    query,
  } = useRouter();
  const clientId = useUserId();

  const {
    pageChangeHandler,
    merge,
    moreBtnClickHandler,
    page,
  } = usePaginate();
  const view = useSelector(UISelectors.getGlobalView);
  const { setView } = useUIActions();
  const { category, filters } = query;
  const filtersString = FilterUtils.getFilterStringFromQueryArray(filters as string[] | undefined);
  const {
    data,
    isLoading,
    isError,
    isFetching,
  } = useGetCatalogQuery({
    category: category as string,
    filters: filtersString,
    merge,
    page,
    sort: query.sort as string || null,
  });

  const viewChangeHandler = useCallback((view: CardView) => {
    setView(view);
    cookieService.set(COOKIE_VIEW_KEY, view);
  }, [setView]);

  const onCategoryChange = useCallback((category: Category) => {
    if (category.url) {
      push(category.url);
    }
  }, [push]);

  useEffect(() => {
    if (data?.data?.products) {
      const items = data.data.products.map((product) => ({
        id: product.id,
        name: product.title,
        price: product.price.value,
        category: data.data.category.title,
        variant: product?.skus?.[0]?.title || '', // ??
        currency: 'UAH',
        quantity: 1,
        url: product.url,
        image: product.pictures?.[0] || '',
        brand: product.brand,
      }));

      const itemsMeasurements = data.data.products.map((product, index) => ({
        item_id: product.id,
        item_name: product.title,
        affiliation: 'Онлайн-магазин',
        // coupon: '',
        currency: 'UAH',
        // discount: '',
        index,
        item_brand: product.brand,
        item_category: data.data.category.title,
        item_list_id: data.data.category.id,
        item_list_name: data.data.category.title,
        item_variant: product?.skus?.[0]?.title || '',
        price: product.price.value,
        quantity: 1,
      }));

      const params = {
        items: itemsMeasurements,
        item_list_id: data.data.category.id,
        item_list_name: data.data.category.title,
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

      // Google Ads Dynamic Remarketing
      const totalValue = data.data.products.reduce((sum, product) => sum + product.price.value, 0);
      pushGAdsEvent({
        event: 'GAds_view_item_list',
        value: totalValue,
        items: data.data.products.map((product) => ({
          id: product.parent_id || product.id,
          google_business_vertical: 'retail',
        })),
      });
    }
  }, [data, clientId]);

  if (isLoading) return <PageLoader />;
  if (isError || !data) return <ErrorMessage error="Error" />;

  return (
    <div className={cn(styles.root, className)}>
      <Container>
        <PageBreadcrumbs breadcrumbs={data.data.breadcrumbs} className={styles.breadcrumps} />
        <CategorySlider
          categories={data.data.children}
          category={data.data.category}
          isSubcategory={getIsSubCategory(data.data.category)}
          onCategoryChange={onCategoryChange}
        />
        <CatalogActions
          basePath={`${routerPaths.catalog}/${category}`}
          filters={data.data.filters}
          view={view}
          sortOptions={data.data.sorter}
          onViewChange={viewChangeHandler}
        />
        <ProductsGrid className={styles.grid} products={data.data.products} view={view} />
        <CatalogPagination
          className={styles.pagination}
          isFetching={isFetching}
          totalPages={data.meta.page.total}
          currentPage={data.meta.page.current}
          onButtonClick={moreBtnClickHandler}
          onPageChange={pageChangeHandler}
        />
      </Container>
    </div>
  );
});
