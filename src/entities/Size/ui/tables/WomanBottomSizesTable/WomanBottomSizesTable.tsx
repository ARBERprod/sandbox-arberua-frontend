import { memo, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { SizeTable } from '@/entities/Size';
import { TableColumn } from '@/shared/ui/Table/types';
import { womanBottomClothesColumns } from '../../../config/tablesConfig';
import { WomanBottomClothesData } from '../../../model/types';

interface WomanBottomSizesTableProps {
  className?: string;
  data: WomanBottomClothesData[];
  title?: string;
  columnsConfig?: TableColumn<WomanBottomClothesData>[];
}

export const WomanBottomSizesTable = memo(({
  className, title, data = [], columnsConfig,
}:WomanBottomSizesTableProps) => {
  const { t } = useTranslation(['sizes']);
  const columns = useMemo(() => columnsConfig || womanBottomClothesColumns(t), [t, columnsConfig]);
  return (
    <SizeTable
      data={data}
      columns={columns}
      className={className}
      title={title || t('sizes:jeans/pants_size')}
    />
  );
});
