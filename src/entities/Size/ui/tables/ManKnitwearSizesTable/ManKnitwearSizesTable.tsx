import { memo, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { SizeTable } from '../SizeTable';
import { manKnitwearColumns } from '../../../config/tablesConfig';
import { ManKnitwearData } from '../../../model/types';

interface ManKnitwearSizesTableProps {
  className?: string;
  data: ManKnitwearData[];
  title?: string;
}

export const ManKnitwearSizesTable = memo(({
  className, title, data = [],
}: ManKnitwearSizesTableProps) => {
  const { t } = useTranslation(['sizes']);
  const columns = useMemo(() => manKnitwearColumns(t), [t]);

  return (
    <SizeTable
      data={data}
      columns={columns}
      title={title}
      className={className}
    />
  );
});
