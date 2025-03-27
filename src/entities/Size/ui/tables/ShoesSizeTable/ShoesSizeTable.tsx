import { memo, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { SizeTable } from '@/entities/Size';
import { shoesClothesColumns } from '../../../config/tablesConfig';
import { ShoesData } from '../../../model/types';

interface ShoesSizeTableProps {
  className?: string;
  data: ShoesData[];
  title: string;
}

export const ShoesSizeTable = memo(({ className, data = [], title }:ShoesSizeTableProps) => {
  const { t } = useTranslation(['sizes']);
  const columns = useMemo(() => shoesClothesColumns(t), [t]);
  return (
    <SizeTable
      className={className}
      title={title}
      columns={columns}
      data={data}
    />
  );
});
