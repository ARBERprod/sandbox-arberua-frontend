import { Header, SortState, TableColumn } from '../types';

export const generateTableHeaders = <T extends object>(columns: TableColumn<T>[],
  sort: SortState<T> | null): Header<T>[] => columns.map(
    (column, index) => ({
      id: String(index),
      data: column.data,
      label: column.header,
      canSort: sort !== null && sort.accessor === column.sortAccessor,
      sortedBy: sort !== null && sort.order,
      sortAccessor: column.sortAccessor,
    }),
  );
