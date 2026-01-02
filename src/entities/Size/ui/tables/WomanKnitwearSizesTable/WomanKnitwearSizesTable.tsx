import { memo, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { SizeTable } from '../SizeTable';
import { womanKnitwearColumns } from '../../../config/tablesConfig';
import { WomanKnitwearData } from '../../../model/types';

interface WomanKnitwearSizesTableProps {
  className?: string;
  data: WomanKnitwearData[];
  title?: string;
}

export const WomanKnitwearSizesTable = memo(({
  className, title, data = [],
}: WomanKnitwearSizesTableProps) => {
  const { t } = useTranslation(['sizes']);
  const columns = useMemo(() => womanKnitwearColumns(t), [t]);

  return (
    <SizeTable
      data={data}
      columns={columns}
      title={title}
      className={className}
    />
  );
});
