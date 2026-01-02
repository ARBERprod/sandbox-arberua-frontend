import { useTranslation } from 'next-i18next';
import { memo, useMemo } from 'react';
import { arberHeightClothesColumns } from '../../../config/tablesConfig';
import { SizeTable } from '../SizeTable';
import { ArberHeightData } from '../../../model/types';

interface ArberHeightSizesTableProps {
  className?: string;
  data: ArberHeightData[];
}

export const ArberHeightSizesTable = memo(({
  className,
  data = [],
}: ArberHeightSizesTableProps) => {
  const { t } = useTranslation(['sizes']);
  const columns = useMemo(() => arberHeightClothesColumns(t), [t]);
  return (
    <SizeTable
      className={className}
      data={data}
      columns={columns}
    />
  );
});
