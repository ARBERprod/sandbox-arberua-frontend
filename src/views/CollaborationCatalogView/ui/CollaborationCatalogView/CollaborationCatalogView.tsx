import { memo, useCallback } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { Container } from '@/shared/ui/Container';
import { CatalogActions } from '@/widgets/CatalogActions';
import { ProductsGrid } from '@/widgets/ProductPresenter';
import { CatalogPagination, usePaginate } from '@/widgets/CatalogPagination';
import { CardView } from '@/shared/types/common';
import { routerPaths } from '@/shared/config/router';
import { PageLoader } from '@/shared/ui/Loader';
import { ErrorMessage } from '@/shared/ui/Form/ErrorMessage';
import { PageBreadcrumbs } from '@/shared/ui/Breadcrumps';
import { Flex } from '@/shared/ui/Flex';
import { useGetCollaborationQuery } from '@/entities/Collaboration';
import { COOKIE_VIEW_KEY } from '@/shared/constants/common';
import { cookieService } from '@/shared/lib/services/cookie.service';
import { UISelectors, useUIActions } from '@/entities/UI';
import { FilterUtils } from '@/entities/Filter';
import { getInitSortValue } from '@/features/ProductSort';
import { CollaborationHeader } from '../CollaborationHeader';
import styles from './CollaborationCatalogView.module.scss';

interface CollaborationCatalogViewProps {
  className?: string;
}

export const CollaborationCatalogView = memo(({ className }: CollaborationCatalogViewProps) => {
  const {
    pageChangeHandler,
    moreBtnClickHandler,
    merge,
    page,
  } = usePaginate();

  const view = useSelector(UISelectors.getGlobalView);
  const { setView } = useUIActions();

  const { query } = useRouter();
  const collaborationId = query.id as string;
  const filtersString = FilterUtils.getFilterStringFromQueryArray(query.filters as string[] | undefined);

  const {
    data,
    isLoading,
    isError,
    isFetching,
  } = useGetCollaborationQuery({
    collaboration_id: collaborationId,
    filters: filtersString,
    // Same helper as getServerSideProps: differing args would make forceRefetch refetch on hydration.
    sort: getInitSortValue(query),
    // "Показати ще" appends instead of replacing only if merge reaches the endpoint.
    merge,
    page,
  });

  const viewChangeHandler = useCallback((view: CardView) => {
    setView(view);
    cookieService.set(COOKIE_VIEW_KEY, view);
  }, [setView]);

  if (isLoading) return <PageLoader />;
  if (isError || !data) return <ErrorMessage error="Error" />;

  const {
    collaboration,
    breadcrumbs,
    filter,
    sorter,
    products,
  } = data.data;

  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.body}>
        <Container>
          <Flex justify="center">
            <PageBreadcrumbs className={styles.bc} breadcrumbs={breadcrumbs} />
          </Flex>

          <CollaborationHeader className={styles.header} collaboration={collaboration} />

          <CatalogActions
            className={styles.actions}
            // Filters, sorting and pagination stay inside the section: the collections base path
            // would send the user to /collection/{id}.
            basePath={routerPaths.collaboration(collaborationId)}
            filters={filter || []}
            view={view}
            sortOptions={sorter}
            onViewChange={viewChangeHandler}
          />
          <ProductsGrid products={products} view={view} />
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
