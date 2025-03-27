import cn from 'classnames';
import { Typography } from '@/shared/ui/Typography';
import { typedMemo } from '@/shared/lib/utils/typedMemo';
import { SortAccessor, TableProps } from '../../types';
import { SortButton } from '../SortButton';
import { useTable } from '../../lib/useTable';
import styles from './SeparatedTable.module.scss';

interface SeparatedTableProps<T extends object> extends TableProps<T> {
  className?: string;
}

export const SeparatedTable = typedMemo(<T extends object>({
  className, data = [], columns = [], useGlobalFilter,
}: SeparatedTableProps<T>) => {
  const {
    headers, onSort, rows,
  } = useTable({ data, columns, useGlobalFilter });
  return (
    <div className={cn(styles.root, className)}>
      <table className={cn(styles.table, className)}>
        <thead className={styles.thead}>
          <tr
            className={styles.tr}
          >
            {headers.map((header) => (
              <th
                className={cn(styles.th, styles[header.data?.headAlign || 'left'])}
                key={header.id}
              >
                <div className={cn(styles.thWrap, styles.hoverDiv, styles[header.data?.headAlign || 'left'])}>
                  <Typography variant="body-2" className={styles.headingTitle}>
                    {header.label}
                  </Typography>
                  {header.sortAccessor
                  && (
                    <SortButton
                      order={header.canSort && header.sortedBy!}
                      onClick={() => onSort(
                        {
                          order: header.sortedBy === 'asc' ? 'desc' : 'asc',
                          accessor: header.sortAccessor as SortAccessor<T>,
                        },
                      )}
                    />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {rows.map((row) => (
            <tr className={styles.tr} key={row.id}>
              {row.cells.map(
                (cell) => (
                  <td
                    className={cn(styles.td, styles[cell.data?.cellAlign || 'left'])}
                    key={cell.id}
                  >
                    <div className={styles.tdWrap}>
                      {cell.render()}
                    </div>
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
