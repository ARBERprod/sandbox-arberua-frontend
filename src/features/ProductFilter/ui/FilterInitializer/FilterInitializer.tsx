import { ReactNode, useEffect, useRef } from 'react';
import { FilterItem } from '@/entities/Filter';
import { useFilterActions } from '../../model/slices/filterSlice';
import { getInitFilterValues } from '../../lib/getInitFilterValues';
import { useRouter } from 'next/router';

interface FilterInitializerProps {
  children: ReactNode;
  filters: FilterItem[];
}

export const FilterInitializer = ({ children, filters }: FilterInitializerProps) => {
  const isInitedRef = useRef(false);
  const { query } = useRouter();
  const { setValues } = useFilterActions();

  useEffect(() => {
    if (isInitedRef.current) {
      return;
    }
    setTimeout(() => {
      const initValues = getInitFilterValues(filters);

      setValues(initValues);
      isInitedRef.current = true;
    }, 0);
  }, [filters, query, setValues]);
  return (
    // eslint-disable-next-line
    <>
      {children}
    </>
  );
};
