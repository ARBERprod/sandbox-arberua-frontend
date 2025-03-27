import { memo, useState } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { SeparatedTable } from '@/shared/ui/Table';
import { Loader } from '@/shared/ui/Loader';
import { ErrorMessage } from '@/shared/ui/Form/ErrorMessage';
import { Pagination } from '@/shared/ui/Pagination';
import { FlexCol } from '@/shared/ui/Flex';
import { useGetSellerReviewsQuery } from '../../api/officeReviewsApi';
import { consultationsReviewColumns } from '../../constants/productsTableConfig';
import styles from './ConsultationsReviewTable.module.scss';

interface ConsultationsReviewTableProps {
  className?: string;
}

export const ConsultationsReviewTable = memo(({ className }:ConsultationsReviewTableProps) => {
  const [page, setPage] = useState(1);
  const {
    data, isLoading, isError,
  } = useGetSellerReviewsQuery({ page });
  const { t } = useTranslation();

  if (isLoading) return <Loader centered />;

  if (isError || !data) return <ErrorMessage error="Error" />;

  return (
    <FlexCol fullWidth gap="16">
      <SeparatedTable
        className={cn(styles.root, className)}
        data={data.data}
        columns={consultationsReviewColumns(t)}
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
