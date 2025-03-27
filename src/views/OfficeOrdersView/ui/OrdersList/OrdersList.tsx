import { memo, useState } from 'react';
import cn from 'classnames';
import { OrderDetailsCard, useGetOrdersQuery } from '@/entities/Order';
import { FlexCol } from '@/shared/ui/Flex';
import { Loader } from '@/shared/ui/Loader';
import { ErrorMessage } from '@/shared/ui/Form/ErrorMessage';
import { Pagination } from '@/shared/ui/Pagination';
import styles from './OrdersList.module.scss';

interface OrdersListProps {
  className?: string;
}

export const OrdersList = memo(({ className }: OrdersListProps) => {
  const [page, setPage] = useState(1);
  const {
    data,
    isLoading,
    isError,
  } = useGetOrdersQuery({ page });

  if (isLoading) return <Loader data-testid="list-loader" className={className} centered />;
  if (isError || !data) return <ErrorMessage className={className} error="Error" />;
  return (
    <div className={cn(styles.root, className)}>
      <FlexCol className="mt-4" as="ul" fullWidth gap="12">
        {data.data.map((orderDetails) => (
          <li key={orderDetails.id} className="w-full">
            <OrderDetailsCard order={orderDetails} />
          </li>
        ))}
      </FlexCol>
      <Pagination
        className={styles.pagination}
        pageCount={data.meta.page.total}
        onPageChange={(page: number) => setPage(page)}
        activePage={page}
      />
    </div>
  );
});
