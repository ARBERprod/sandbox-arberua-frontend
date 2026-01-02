import { memo, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { SizeTable } from '../SizeTable';
import { manCasualTrousersColumns } from '../../../config/tablesConfig';
import { ManCasualTrousersData } from '../../../model/types';

interface ManCasualTrousersSizesTableProps {
  className?: string;
  data: ManCasualTrousersData[];
  title?: string;
}

export const ManCasualTrousersSizesTable = memo(({
  className, title, data = [],
}: ManCasualTrousersSizesTableProps) => {
  const { t } = useTranslation(['sizes']);
  const columns = useMemo(() => manCasualTrousersColumns(t), [t]);

  return (
    <SizeTable
      data={data}
      columns={columns}
      title={title}
      className={className}
    />
  );
});
