import { Primitive } from '@/shared/types/common';
import { SortState } from '../types';

export const sortTableData = <T extends object>(data: T[], sort: SortState<T>) => [...data].sort((a, b) => {
  const { accessor, order } = sort;
  let firstEl;
  let secondEl;

  if (typeof accessor === 'string') {
    firstEl = a[accessor] as Primitive;
    secondEl = b[accessor] as Primitive;
  } else {
    firstEl = accessor(a);
    secondEl = accessor(b);
  }

  if (firstEl === null && secondEl === null) return 0;
  if (firstEl === null) return 1;
  if (secondEl === null) return -1;

  return firstEl.toString().localeCompare(secondEl.toString(), undefined, {
    numeric: true,
  }) * (order === 'asc' ? 1 : -1);
});
