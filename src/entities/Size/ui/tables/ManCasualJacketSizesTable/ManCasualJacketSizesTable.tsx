import { memo, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { SizeTable } from '../SizeTable';
import { manCasualJacketColumns } from '../../../config/tablesConfig';
import { ManCasualJacketData } from '../../../model/types';

interface ManCasualJacketSizesTableProps {
  className?: string;
  data: ManCasualJacketData[];
  title?: string;
}

export const ManCasualJacketSizesTable = memo(({
  className, title, data = [],
}: ManCasualJacketSizesTableProps) => {
  const { t } = useTranslation(['sizes']);
  const columns = useMemo(() => manCasualJacketColumns(t), [t]);

  return (
    <SizeTable
      data={data}
      columns={columns}
      title={title}
      className={className}
    />
  );
});
