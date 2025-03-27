import { LocationAdapter, useGetCountriesQuery } from '@/entities/Location';
import { useMemo } from 'react';

export const useCountrySelect = () => {
  const { data, isLoading } = useGetCountriesQuery();

  const options = useMemo(() => {
    if (!data) return [];
    return data.map(LocationAdapter.mapCountryToSelectOption);
  }, [data]);

  return {
    options,
    isLoading,
  };
};
