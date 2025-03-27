import { ReactNode } from 'react';
import { Primitive } from '@/shared/types/common';

type TableAlign = 'center' | 'left' | 'right';

export interface ColumnData {
  headAlign?: TableAlign;
  cellAlign?: TableAlign;
}

export interface Cell {
  id: string;
  render: () => ReactNode;
  data?: ColumnData;
}

export interface Row {
  id: string;
  cells: Cell[]
}

export type SortAccessor<T extends object> = (keyof T & string) | ((row: T) => Primitive)

export interface TableColumn<T extends object = {}> {
  accessor: (keyof T & string) | ((row: T) => ReactNode);
  header: string;
  sortAccessor?: SortAccessor<T>;
  data?: ColumnData;
}

export type SortOrder = 'asc' | 'desc';

export interface Header<T extends object> {
  id: string;
  label: string;
  canSort: boolean;
  sortedBy?: SortOrder | false;
  sortAccessor?: SortAccessor<T>;
  data?: ColumnData;
}

export interface SortState<T extends object> {
  accessor: (keyof T & string) | ((row: T) => Primitive);
  order: SortOrder;
}

export interface TableProps<T extends object> {
  data: T[];
  columns: TableColumn<T>[];
  useGlobalFilter?: boolean;
}
