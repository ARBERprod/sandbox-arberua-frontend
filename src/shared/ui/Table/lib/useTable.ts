import { useCallback, useMemo, useState } from 'react';
import { sortTableData } from './sortTableData';
import {
  Header, Row, SortState, TableProps,
} from '../types';
import { generateTableRows } from './generateTableRows';
import { generateTableHeaders } from './generateTableHeaders';
import { getGloballyFilteredData } from './getGloballyFilteredData';

export const useTable = <T extends object>({ columns = [], data = [], useGlobalFilter }: TableProps<T>) => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [sort, setSort] = useState<SortState<T> | null>(null);

  const filteredData: T[] = useMemo(() => {
    if (!useGlobalFilter) return data;
    return getGloballyFilteredData(data, globalFilter);
  }, [data, globalFilter, useGlobalFilter]);

  const sortedData = useMemo(() => {
    if (!sort) return filteredData;
    return sortTableData(filteredData, sort);
  }, [sort, filteredData]);

  const rows: Row[] = generateTableRows(sortedData, columns);

  const headers: Header<T>[] = generateTableHeaders(columns, sort);

  const onSort = useCallback((sort: SortState<T>) => {
    setSort(sort);
  }, []);

  return {
    rows,
    headers,
    onSort,
    globalFilter,
    setGlobalFilter,
  };
};
