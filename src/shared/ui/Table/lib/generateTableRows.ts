import { ReactNode } from 'react';
import { TableColumn } from '../types';
import { getDefaultCellValue } from './getDefaultCellValue';

export const generateTableRows = <T extends object>(data: T[], columns: TableColumn<T>[]) => data.map(
  (item, index) => ({
    id: String(index),
    cells: columns.map((column, index) => ({
      id: String(index),
      data: column.data,
      render: (): ReactNode => {
        if (typeof column.accessor === 'string') {
          return getDefaultCellValue(item[column.accessor] as string);
        }
        return column.accessor(item);
      },
    })),
  }),
);
