import cn from 'classnames';
import { typedMemo } from '@/shared/lib/utils/typedMemo';
import { Typography } from '@/shared/ui/Typography';
import styles from './StripedTable.module.scss';
import { TableProps } from '../../types';
import { useTable } from '../../lib/useTable';

interface StripedTableProps<T extends object> extends TableProps<T> {
  className?: string;
}

export const StripedTable = typedMemo(
  <T extends object>({ className, data = [], columns = [] }: StripedTableProps<T>) => {
    const { rows, headers } = useTable({ data, columns });
    return (
      <div className={cn(styles.root, className)}>
        <table className={cn(styles.table)}>
          <thead className={styles.thead}>
            <tr
              className={styles.tr}
            >
              {headers.map((header) => (
                <th
                  className={cn(styles.th, styles[header.data?.headAlign || 'center'])}
                  key={header.id}
                >
                  <div className={cn(styles.thWrap, styles.hoverDiv, styles[header.data?.headAlign || 'center'])}>
                    <Typography variant="body-2" className={styles.headingTitle}>
                      {header.label}
                    </Typography>
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
                      className={cn(styles.td, styles[cell.data?.cellAlign || 'center'])}
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
  },
);
