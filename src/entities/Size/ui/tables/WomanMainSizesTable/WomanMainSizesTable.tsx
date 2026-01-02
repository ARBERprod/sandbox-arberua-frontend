import { memo, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { SizeTable } from '../SizeTable';
import { womanMainClothesColumns } from '../../../config/tablesConfig';
import { WomanMainClothesData } from '../../../model/types';

interface WomanMainSizesTableProps {
  className?: string;
  data: WomanMainClothesData[];
  title?: string;
}

export const WomanMainSizesTable = memo(({
  className, title, data = [],
}: WomanMainSizesTableProps) => {
  const { t } = useTranslation(['sizes']);
  const columns = useMemo(() => womanMainClothesColumns(t), [t]);

  return (
    <SizeTable
      data={data}
      columns={columns}
      title={title}
      className={className}
    />
  );
});
