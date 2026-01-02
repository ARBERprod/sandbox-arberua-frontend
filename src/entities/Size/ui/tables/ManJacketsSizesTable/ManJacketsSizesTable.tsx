import { memo, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { SizeTable } from '../SizeTable';
import { manFormalTopColumns } from '../../../config/tablesConfig';
import { ManFormalTopData } from '../../../model/types';

interface ManJacketsSizesTableProps {
  className?: string;
  data: ManFormalTopData[];
  title?: string;
}

export const ManJacketsSizesTable = memo(({
  className, title, data = [],
}: ManJacketsSizesTableProps) => {
  const { t } = useTranslation(['sizes']);
  const columns = useMemo(() => manFormalTopColumns(t), [t]);

  return (
    <SizeTable
      data={data}
      columns={columns}
      title={title}
      className={className}
    />
  );
});
