import { memo, useState } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { SeparatedTable } from '@/shared/ui/Table';
import { useGetOrdersQuery } from '@/entities/Order';
import { Pagination } from '@/shared/ui/Pagination';
import { Loader } from '@/shared/ui/Loader';
import { ErrorMessage } from '@/shared/ui/Form/ErrorMessage';
import styles from './OrdersTable.module.scss';
import { tableColumns } from '../../constants/tableColumns';

interface OrdersTableProps {
  className?: string;
}

export const OrdersTable = memo(({ className }: OrdersTableProps) => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetOrdersQuery({ page });
  const { t } = useTranslation();
  if (isLoading) return <Loader className={className} data-testid="table-loader" centered />;
  if (isError || !data) return <ErrorMessage className={className} error="Error" />;
  return (
    <div className={cn(styles.root, className)}>
      <SeparatedTable className={styles.table} data={data.data} columns={tableColumns(t)} />
      <Pagination
        className={styles.pagination}
        pageCount={data.meta.page.total}
        onPageChange={(page: number) => setPage(page)}
        activePage={page}
      />
    </div>
  );
});
