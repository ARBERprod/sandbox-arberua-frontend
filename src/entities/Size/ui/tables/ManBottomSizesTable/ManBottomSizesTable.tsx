import { memo, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { manBottomClothesColumns } from '../../../config/tablesConfig';
import { SizeTable } from '../SizeTable';
import { ManBottomClothesUAData } from '../../../model/types';

interface ManBottomSizesTableProps {
  className?: string;
  data: ManBottomClothesUAData[]
  title?: string;
}

export const ManBottomSizesTable = memo(({ className, data = [], title }:ManBottomSizesTableProps) => {
  const { t } = useTranslation(['sizes']);
  const columns = useMemo(() => manBottomClothesColumns(t), [t]);
  return (
    <SizeTable
      className={className}
      title={title || t('sizes:jeans/pants_size')}
      data={data}
      columns={columns}
    />
  );
});
