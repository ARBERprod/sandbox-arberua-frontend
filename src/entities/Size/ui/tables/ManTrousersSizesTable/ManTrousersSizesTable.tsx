import { memo, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { SizeTable } from '../SizeTable';
import { manFormalTrousersColumns } from '../../../config/tablesConfig';
import { ManFormalTrousersData } from '../../../model/types';

interface ManTrousersSizesTableProps {
  className?: string;
  data: ManFormalTrousersData[];
  title?: string;
}

export const ManTrousersSizesTable = memo(({
  className, title, data = [],
}: ManTrousersSizesTableProps) => {
  const { t } = useTranslation(['sizes']);
  const columns = useMemo(() => manFormalTrousersColumns(t), [t]);

  return (
    <SizeTable
      data={data}
      columns={columns}
      title={title}
      className={className}
    />
  );
});
