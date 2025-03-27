import { memo, useState } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { SeparatedTable } from '@/shared/ui/Table';
import { Loader } from '@/shared/ui/Loader';
import { ErrorMessage } from '@/shared/ui/Form/ErrorMessage';
import { FlexCol } from '@/shared/ui/Flex';
import { Pagination } from '@/shared/ui/Pagination';
import styles from './ProductsReviewTable.module.scss';
import { productReviewColumns } from '../../constants/productsTableConfig';
import { useGetProductReviewsQuery } from '../../api/officeReviewsApi';

interface ProductsReviewTableProps {
  className?: string;
}

export const ProductsReviewTable = memo(({ className }: ProductsReviewTableProps) => {
  const [page, setPage] = useState(1);
  const {
    data,
    isLoading,
    isError,
  } = useGetProductReviewsQuery({ page });

  const { t } = useTranslation();

  if (isLoading) return <Loader centered />;
  if (!data || isError) return <ErrorMessage error="Error" />;

  return (
    <FlexCol fullWidth gap="16">
      <SeparatedTable
        data={data.data}
        columns={productReviewColumns(t)}
        className={cn(styles.root, className)}
      />
      <Pagination
        className={styles.centered}
        pageCount={data.meta.page.total}
        onPageChange={(page: number) => setPage(page)}
        activePage={page}
      />
    </FlexCol>
  );
});
