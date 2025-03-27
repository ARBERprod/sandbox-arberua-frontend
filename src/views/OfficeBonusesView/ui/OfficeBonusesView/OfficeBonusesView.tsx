import { memo } from 'react';
import cn from 'classnames';
import { BonusTable, useGetOfficeBonusesQuery } from '@/entities/Bonus';
import styles from './OfficeBonusesView.module.scss';
import { usePaginate } from '@/widgets/CatalogPagination';
import { Pagination } from '@/shared/ui/Pagination';
import { ErrorMessage } from '@/shared/ui/Form/ErrorMessage';
import { Loader } from '@/shared/ui/Loader';

interface OfficeBonusesViewProps {
  className?: string;
}

export const OfficeBonusesView = memo(({ className }:OfficeBonusesViewProps) => {
  const { page, pageChangeHandler } = usePaginate({ useStatePage: true });
  const { data, isLoading, isError } = useGetOfficeBonusesQuery({ page });
  if (isLoading) return <Loader centered />;
  if (isError || !data) return <ErrorMessage error="Error" />;
  return (
    <div className={cn(styles.root, className)}>
      <BonusTable bonuses={data.data} className="hide-mobile-tablet" />
      <Pagination
        className={styles.pagination}
        pageCount={data.meta.page.total}
        onPageChange={pageChangeHandler}
        activePage={page}
      />
    </div>
  );
});
