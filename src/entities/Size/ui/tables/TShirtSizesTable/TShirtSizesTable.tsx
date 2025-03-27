import { memo, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { SizeTable } from '@/entities/Size';
import { TShirtData } from '../../../model/types';
import { tShortClothesColumns } from '../../../config/tablesConfig';

interface TShirtSizesTableProps {
  className?: string;
  data: TShirtData[];
  title?: string;
}

export const TShirtSizesTable = memo(({ className, title, data = [] }:TShirtSizesTableProps) => {
  const { t } = useTranslation(['sizes']);
  const columns = useMemo(() => tShortClothesColumns(t), [t]);
  return (
    <SizeTable
      data={data}
      columns={columns}
      title={title || t('sizes:t-shirt_size')}
      className={className}
    />
  );
});
