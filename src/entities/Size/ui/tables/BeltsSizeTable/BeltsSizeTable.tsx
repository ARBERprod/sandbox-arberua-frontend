import { memo, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { SizeTable } from '@/entities/Size';
import { beltsClothesColumns } from '../../../config/tablesConfig';
import { BeltsData } from '../../../model/types';

interface BeltsSizeTableProps {
  className?: string;
  data: BeltsData[];
  title?: string;
}

export const BeltsSizeTable = memo(({ className, title, data = [] }:BeltsSizeTableProps) => {
  const { t } = useTranslation(['sizes']);
  const columns = useMemo(() => beltsClothesColumns(t), [t]);
  return (
    <SizeTable
      data={data}
      columns={columns}
      className={className}
      title={title || t('sizes:jeans/pants_size')}
    />
  );
});
