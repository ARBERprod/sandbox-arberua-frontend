import { memo, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { SizeTable } from '../SizeTable';
import { manTopClothesColumns } from '../../../config/tablesConfig';
import { ManTopClothesData } from '../../../model/types';

interface ManLightTopSizesTableProps {
  className?: string;
  data: ManTopClothesData[];
  title?: string;
}

export const ManLightTopSizesTable = memo(({ className, data = [], title }:ManLightTopSizesTableProps) => {
  const { t } = useTranslation(['sizes']);
  const columns = useMemo(() => manTopClothesColumns(t), [t]);
  return (
    <SizeTable
      className={className}
      data={data}
      title={title || t('sizes:man_clothes_size')}
      columns={columns}
    />
  );
});
