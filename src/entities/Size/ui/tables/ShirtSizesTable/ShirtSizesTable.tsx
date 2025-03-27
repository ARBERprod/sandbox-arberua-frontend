import { memo, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { SizeTable } from '../SizeTable';
import { ShirtData } from '../../../model/types';
import { shortClothesColumns } from '../../../config/tablesConfig';

interface ShirtSizesTableProps {
  className?: string;
  data: ShirtData[];
  title?: string;
}

export const ShirtSizesTable = memo(({ className, data = [], title }:ShirtSizesTableProps) => {
  const { t } = useTranslation(['sizes']);
  const columns = useMemo(() => shortClothesColumns(t), [t]);
  return (
    <SizeTable
      className={className}
      data={data}
      columns={columns}
      title={title || t('sizes:shirt_size')}
    />
  );
});
