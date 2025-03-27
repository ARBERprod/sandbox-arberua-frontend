import { memo } from 'react';
import cn from 'classnames';
import { SeparatedTable } from '@/shared/ui/Table';
import { useTranslation } from 'next-i18next';
import styles from './BonusTable.module.scss';
import { Bonus } from '../../model/types';
import { tableColumns } from '../../constants/tableColumns';

interface BonusTableProps {
  bonuses: Bonus[];
  className?: string;
}

export const BonusTable = memo(({ className, bonuses = [] }:BonusTableProps) => {
  const { t } = useTranslation();

  return (
    <SeparatedTable
      className={cn(styles.root, className)}
      data={bonuses}
      columns={tableColumns(t)}
    />
  );
});
