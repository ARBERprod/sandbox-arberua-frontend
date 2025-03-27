import { memo, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { SizeTable } from '@/entities/Size';
import { womanBottomClothesColumns } from '../../../config/tablesConfig';
import { WomanBottomClothesData } from '../../../model/types';

interface WomanBottomSizesTableProps {
  className?: string;
  data: WomanBottomClothesData[];
  title?: string;
}

export const WomanBottomSizesTable = memo(({ className, title, data = [] }:WomanBottomSizesTableProps) => {
  const { t } = useTranslation(['sizes']);
  const columns = useMemo(() => womanBottomClothesColumns(t), [t]);
  return (
    <SizeTable
      data={data}
      columns={columns}
      className={className}
      title={title || t('sizes:jeans/pants_size')}
    />
  );
});
