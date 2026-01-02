import { memo, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { SizeTable } from '../SizeTable';
import { manShirtFormalColumns } from '../../../config/tablesConfig';
import { ManShirtFormalData } from '../../../model/types';

interface ManShirtFormalSizesTableProps {
  className?: string;
  data: ManShirtFormalData[];
  title?: string;
}

export const ManShirtFormalSizesTable = memo(({
  className, title, data = [],
}: ManShirtFormalSizesTableProps) => {
  const { t } = useTranslation(['sizes']);
  const columns = useMemo(() => manShirtFormalColumns(t), [t]);

  return (
    <SizeTable
      data={data}
      columns={columns}
      title={title}
      className={className}
    />
  );
});
