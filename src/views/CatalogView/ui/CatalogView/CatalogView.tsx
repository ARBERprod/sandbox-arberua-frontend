import {
  memo, useCallback, useEffect, useRef, useState,
} from 'react';
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
import { measurementsPost, pushDataLayerEvent } from '@/shared/lib/analytics/dataLayer';
import { useUserId } from '@/entities/Session';
import { useFixedHeader } from '@/shared/lib/hooks/useFixedHeader';
import { useGetPromotionsQuery, PromotionsGrid } from '@/entities/Promotion';
import { useGetPostsQuery, PostsGrid } from '@/entities/Blog';
import { Typography } from '@/shared/ui/Typography';
import { useTranslation } from 'next-i18next';

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
  const { t } = useTranslation('common');
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

  const isHeaderFixed = useFixedHeader();
  const actionsRef = useRef<HTMLDivElement>(null);
  const [isActionsFixed, setIsActionsFixed] = useState(false);

  const { data: blogData } = useGetPostsQuery({
    page: 1,
    merge: false,
  });
  const { data: promotionsData } = useGetPromotionsQuery();

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
    }
  }, [data, clientId]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (!actionsRef.current) return;
        const { top } = actionsRef.current.getBoundingClientRect();
        setIsActionsFixed(top <= 60);
      }, 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) return <PageLoader />;
  if (isError || !data) return <ErrorMessage error="Error" />;

  // @ts-ignore
  return (
    <div className={cn(styles.root, className)}>
      <Container>
        <PageBreadcrumbs breadcrumbs={data.data.breadcrumbs} className={styles.breadcrumps} />
        <CategorySlider
          categories={data.data.children}
          category={data.data.category}
          view={view}
          isSubcategory={getIsSubCategory(data.data.category)}
          onCategoryChange={onCategoryChange}
          onViewChange={viewChangeHandler}
        />
        <div
          ref={actionsRef}
          className={cn(styles.actionsWrapper, {
            [styles.fixed]: isActionsFixed && isHeaderFixed,
          })}
        >
          <CatalogActions
            basePath={`${routerPaths.catalog}/${category}`}
            filters={data.data.filters}
            view={view}
            sortOptions={data.data.sorter}
            onViewChange={viewChangeHandler}
          />
        </div>
        <ProductsGrid className={styles.grid} products={data.data.products} view={view} />
        <CatalogPagination
          className={styles.pagination}
          isFetching={isFetching}
          totalPages={data.meta.page.total}
          currentPage={data.meta.page.current}
          onButtonClick={moreBtnClickHandler}
          onPageChange={pageChangeHandler}
        />
        <Typography variant="title-1" centered className="mt-10">
          {t('category_read_more_blog_title')}
        </Typography>
        {blogData?.data?.posts && blogData.data.posts.length > 0 && (
          <div className={styles.latestNews}>
            <PostsGrid className={styles.latestNewsWrapper} articles={blogData.data.posts.slice(0, 3)} />
          </div>
        )}
        {(() => {
          if (!promotionsData || !promotionsData.data.length) return null;

          console.log('promotionsData', promotionsData);

          const currentCatalogLink = `/catalog/${category}`;

          const activePromotions = promotionsData.data
            .filter((promo) => promo.is_started
              && promo.link !== currentCatalogLink)
            .sort((a, b) => {
              const aEnd = new Date(a.end_date).getTime();
              const bEnd = new Date(b.end_date).getTime();
              return aEnd - bEnd;
            })
            .slice(0, 2);

          if (activePromotions.length === 0) return null;

          return (
            <div className={styles.latestPromotions}>
              <Typography variant="title-1" centered className="mt-10">
                {t('category_read_more_promo_title')}
              </Typography>
              <PromotionsGrid className="mt-6" promotions={activePromotions} />
            </div>
          );
        })()}
      </Container>
    </div>
  );
});
