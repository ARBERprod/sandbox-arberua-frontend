import { useCallback, useMemo, useState } from 'react';
import {
  LocationAdapter, useGetBigCitiesQuery, useGetCityByIdQuery, useSearchCitiesQuery,
} from '@/entities/Location';
import { useDebouncedValue } from '@/shared/lib/hooks/debounce/useDebouncedValue';
import { SingleSelectOption } from '@/shared/ui/Form/SelectField';

export const useCitySearch = (initialCityId?: string) => {
  const [queryValue, setQueryValue] = useState('');
  const query = useDebouncedValue(queryValue, 200);
  const { data: cities, isLoading } = useSearchCitiesQuery(
    { q: query },
    { skip: query.length < 4 },
  );

  const { data: bigCities, isLoading: bigCitiesLoading } = useGetBigCitiesQuery();
  const { data: singleCity } = useGetCityByIdQuery(
    { city_id: initialCityId || '' },
    { skip: !initialCityId },
  );

  const options = useMemo(() => {
    let options: SingleSelectOption[] = [];
    if (!cities) {
      if (!bigCities) {
        options = [];
      } else {
        options = bigCities.map(LocationAdapter.mapCityToSelectOption);
      }
    } else {
      options = cities.map(LocationAdapter.mapCityToSelectOption);
    }

    if (singleCity) {
      const singleCityIncludes = options.find((option) => option.value === singleCity.id);
      if (!singleCityIncludes) {
        options.unshift({
          label: singleCity.title,
          value: singleCity.id,
        });
      }
    }
    return options;
  }, [bigCities, cities, singleCity]);

  const queryChangeHandler = useCallback((value: string) => {
    setQueryValue(value);
  }, []);

  return {
    isLoading: bigCitiesLoading || isLoading,
    options,
    queryChangeHandler,
  };
};
