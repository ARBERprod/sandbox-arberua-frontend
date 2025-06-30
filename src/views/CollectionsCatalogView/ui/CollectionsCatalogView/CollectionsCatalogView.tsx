import { memo, useCallback } from 'react';
import cn from 'classnames';
import { Container } from '@/shared/ui/Container';
import { CatalogActions } from '@/widgets/CatalogActions';
import { ProductsGrid } from '@/widgets/ProductPresenter';
import { CatalogPagination, usePaginate } from '@/widgets/CatalogPagination';
import { CardView } from '@/shared/types/common';
import { routerPaths } from '@/shared/config/router';
import { PageLoader } from '@/shared/ui/Loader';
import { ErrorMessage } from '@/shared/ui/Form/ErrorMessage';
import { PageBreadcrumbs } from '@/shared/ui/Breadcrumps';
import { Typography } from '@/shared/ui/Typography';
import { Flex } from '@/shared/ui/Flex';
import { useRouter } from 'next/router';
import { useGetCollectionQuery } from '@/entities/Collection';
import { COOKIE_VIEW_KEY } from '@/shared/constants/common';
import { cookieService } from '@/shared/lib/services/cookie.service';
import { useSelector } from 'react-redux';
import { UISelectors, useUIActions } from '@/entities/UI';
import styles from './CollectionsCatalogView.module.scss';
import { FilterUtils } from '@/entities/Filter';
import { CategorySlider } from '@/widgets/CategorySlider';
import { Category } from '@/entities/Category';

interface CollectionsCatalogViewProps {
  className?: string;
}

export const CollectionsCatalogView = memo(({ className }: CollectionsCatalogViewProps) => {
  const {
    pageChangeHandler,
    moreBtnClickHandler,
    page,
  } = usePaginate();

  const view = useSelector(UISelectors.getGlobalView);
  const { setView } = useUIActions();

  const { query, push } = useRouter();
  const filtersString = FilterUtils.getFilterStringFromQueryArray(query.filters as string[] | undefined);
  const collectionId = query.id as string;
  const {
    data,
    isLoading,
    isError,
    isFetching,
  } = useGetCollectionQuery({
    collection_id: collectionId,
    filters: filtersString,
    sort: query.sort as string,
    page,
  });

  const currentCollection: Category | null = data?.data.collection
    ? {
      id: data.data.collection.id,
      title: data.data.collection.title,
      description: data.data.collection.description,
      url: String(data.data.collection.url),
    }
    : null;
  const convertedCollections = ((data?.data as any)?.children || []).map((c: any) => ({
    ...c,
  }));

  const onCollectionChange = useCallback((category: Category) => {
    const filterSlug = category.id;
    const url = filterSlug
      ? `/collection/${collectionId}/kategoriia=${filterSlug}`
      : `/collection/${collectionId}`;
    push(url);
  }, [push, collectionId]);

  const viewChangeHandler = useCallback((view: CardView) => {
    setView(view);
    cookieService.set(COOKIE_VIEW_KEY, view);
  }, [setView]);
  if (isLoading) return <PageLoader />;
  if (isError || !data) return <ErrorMessage error="Error" />;
  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.body}>
        <Container>
          <Flex justify="center">
            <PageBreadcrumbs className={styles.bc} breadcrumbs={data.data.breadcrumbs} />
          </Flex>

          <Typography variant="title-2" centered className={styles.title}>
            {data.data.collection.title}
          </Typography>
          <CategorySlider
            basePath={routerPaths.collections_catalog(collectionId)}
            categories={convertedCollections}
            category={currentCollection}
            filters={data.data.filter || []}
            view={view}
            isSubcategory={false}
            onCategoryChange={onCollectionChange}
            onViewChange={viewChangeHandler}
          />
          <CatalogActions
            className={styles.actions}
            basePath={routerPaths.collections_catalog(collectionId)}
            filters={data.data.filter || []}
            view={view}
            sortOptions={data.data.sorter}
            onViewChange={viewChangeHandler}
          />
          <ProductsGrid products={data.data.products} view={view} />
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
    </div>
  );
});
