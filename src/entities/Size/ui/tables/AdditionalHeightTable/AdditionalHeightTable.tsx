import { memo, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { SizeTable } from '@/entities/Size';
import { additionalHeightColumns } from '../../../config/tablesConfig';
import { AdditionalHeightData } from '../../../model/types';

interface AdditionalHeightTableProps {
  className?: string;
  data: AdditionalHeightData[];
  title?: string;
}

export const AdditionalHeightTable = memo(({ className, title, data = [] }:AdditionalHeightTableProps) => {
  const { t } = useTranslation(['sizes']);
  const columns = useMemo(() => additionalHeightColumns(t), [t]);
  return (
    <SizeTable
      data={data}
      columns={columns}
      className={className}
      title={title}
    />
  );
});
