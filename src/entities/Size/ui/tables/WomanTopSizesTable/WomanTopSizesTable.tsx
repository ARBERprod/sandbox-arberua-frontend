import { memo, ReactNode, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { SizeTable } from '../SizeTable';
import { womanTopClothesColumns } from '../../../config/tablesConfig';
import { WomanTopClothesData } from '../../../model/types';

interface WomanTopSizesTableProps {
  className?: string;
  data: WomanTopClothesData[];
  title?: string;
  action?: ReactNode;
}

export const WomanTopSizesTable = memo(({
  className, title, data = [], action,
}:WomanTopSizesTableProps) => {
  const { t } = useTranslation(['sizes']);
  const columns = useMemo(() => womanTopClothesColumns(t), [t]);

  return (
    <SizeTable
      data={data}
      columns={columns}
      title={title || t('sizes:woman_clothes_size')}
      className={className}
      action={action}
    />
  );
});
