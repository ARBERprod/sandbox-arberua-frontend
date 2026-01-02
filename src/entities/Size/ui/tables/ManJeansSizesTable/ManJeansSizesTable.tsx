import { memo, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { SizeTable } from '../SizeTable';
import { manJeansColumns } from '../../../config/tablesConfig';
import { ManJeansData } from '../../../model/types';

interface ManJeansSizesTableProps {
  className?: string;
  data: ManJeansData[];
  title?: string;
}

export const ManJeansSizesTable = memo(({
  className, title, data = [],
}: ManJeansSizesTableProps) => {
  const { t } = useTranslation(['sizes']);
  const columns = useMemo(() => manJeansColumns(t), [t]);

  return (
    <SizeTable
      data={data}
      columns={columns}
      title={title}
      className={className}
    />
  );
});
