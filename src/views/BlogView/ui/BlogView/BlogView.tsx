import { memo } from 'react';
import cn from 'classnames';
import { Container } from '@/shared/ui/Container';
import { PageBreadcrumbs } from '@/shared/ui/Breadcrumps';
import { Typography } from '@/shared/ui/Typography';
import { BlogCategories, PostsGrid, useGetPostsQuery } from '@/entities/Blog';
import { useRouter } from 'next/router';
import { PageLoader } from '@/shared/ui/Loader';
import { ErrorMessage } from '@/shared/ui/Form/ErrorMessage';
import { CatalogPagination, usePaginate } from '@/widgets/CatalogPagination';
import { useTranslation } from 'next-i18next';
import styles from './BlogView.module.scss';

interface BlogViewProps {
  className?: string;
}

export const BlogView = memo(({ className }: BlogViewProps) => {
  const {
    page, pageChangeHandler, moreBtnClickHandler, merge,
  } = usePaginate();
  const { query } = useRouter();
  const {
    data, isLoading, isError, isFetching,
  } = useGetPostsQuery({
    slug: query.slug as string | undefined,
    page,
    merge,
  });
  const { t } = useTranslation();
  if (isLoading) return <PageLoader />;
  if (isError || !data) return <ErrorMessage error="Error" />;

  return (
    <div className={cn(styles.root, className)}>
      <Container className={styles.container}>
        <PageBreadcrumbs breadcrumbs={data.data.breadcrumbs} className={styles.bc} />
        <Typography variant="title-1" centered className="mt-5">
          {t('menu.blog')}
        </Typography>
        <BlogCategories className={styles.categories} categories={data.data.categories} />
        <PostsGrid articles={data.data.posts} />
        <CatalogPagination
          isFetching={isFetching}
          totalPages={data.meta.page.total}
          currentPage={data.meta.page.current}
          onButtonClick={moreBtnClickHandler}
          onPageChange={pageChangeHandler}
          className={styles.pagination}
        />
      </Container>
    </div>
  );
});
