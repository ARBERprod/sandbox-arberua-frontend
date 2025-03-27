import { memo, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { SizeTable } from '../SizeTable';
import { manTopClothesUaColumns } from '../../../config/tablesConfig';
import { ManTopClothesUaData } from '../../../model/types';

interface ManTopSizesTableProps {
  className?: string;
  data: ManTopClothesUaData[];
  title?: string;
}

export const ManTopSizesTable = memo(({ className, data = [], title }:ManTopSizesTableProps) => {
  const { t } = useTranslation(['sizes']);
  const columns = useMemo(() => manTopClothesUaColumns(t), [t]);
  return (
    <SizeTable
      className={className}
      data={data}
      title={title || t('sizes:man_clothes_size')}
      columns={columns}
    />
  );
});
