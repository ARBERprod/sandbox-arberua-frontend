import { memo } from 'react';
import cn from 'classnames';
import { BonusList, useGetOfficeBonusesQuery } from '@/entities/Bonus';
import styles from './OfficeBonusesList.module.scss';
import { usePaginate } from '@/widgets/CatalogPagination';
import { ErrorMessage } from '@/shared/ui/Form/ErrorMessage';
import { Loader } from '@/shared/ui/Loader';
import { Pagination } from '@/shared/ui/Pagination';

interface OfficeBonusesListProps {
  className?: string;
}

export const OfficeBonusesList = memo(({ className }:OfficeBonusesListProps) => {
  const { page, pageChangeHandler } = usePaginate({ useStatePage: true });
  const { data, isLoading, isError } = useGetOfficeBonusesQuery({ page });
  if (isLoading) return <Loader centered />;
  if (isError || !data) return <ErrorMessage error="Error" />;
  return (
    <div className={cn(styles.root, className)}>
      {data.data.length > 0 ? (
        <BonusList bonuses={data.data} />
      ) : (
        <p>List empty</p>
      )}
      <Pagination
        className={styles.pagination}
        pageCount={data.meta.page.total}
        onPageChange={pageChangeHandler}
        activePage={page}
      />
    </div>
  );
});
