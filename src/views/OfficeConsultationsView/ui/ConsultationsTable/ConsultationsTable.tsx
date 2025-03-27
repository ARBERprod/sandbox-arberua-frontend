import { memo, useState } from 'react';
import { SelectField } from '@/shared/ui/Form/SelectField';
import { SeparatedTable } from '@/shared/ui/Table';
import { useGetConsultationsQuery } from '@/entities/Consultation';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { officeConsultationsColumns } from '../../constants/tableColumns';
import { statusOptions } from '../../constants/statusOptions';
import styles from './ConsultationsTable.module.scss';
import { Loader } from '@/shared/ui/Loader';
import { ErrorMessage } from '@/shared/ui/Form/ErrorMessage';

interface ConsultationsTableProps {
  className?: string;
}

export const ConsultationsTable = memo(({ className }:ConsultationsTableProps) => {
  const [filter, setFilter] = useState('all');
  const { data: consultations, isLoading, isError } = useGetConsultationsQuery();
  const { t } = useTranslation();

  if (isLoading) return <Loader centered />;
  if (!consultations || isError) return <ErrorMessage error="Error" />;

  return (
    <div className={cn(styles.root, className)}>
      <SelectField
        className={styles.filterSelect}
        name="sort"
        value={filter}
        onChange={(name, value) => setFilter(value)}
        options={statusOptions(t)}
      />
      <SeparatedTable
        className={styles.table}
        data={consultations}
        columns={officeConsultationsColumns(t)}
      />
    </div>
  );
});
