import { useGetProductReservationDataQuery } from '@/entities/Product';
import { SingleSelectOption } from '@/shared/ui/Form/SelectField';
import { useMemo } from 'react';
import { LocationAdapter } from '@/entities/Location';

export const useBookProduct = (identifier_sync: string, chosenCityId?: string) => {
  const {
    data,
    isLoading,
    isError,
  } = useGetProductReservationDataQuery({ identifier_sync });

  const cityOptions: SingleSelectOption[] = useMemo(() => {
    if (isLoading) return [];
    if (isError || !data) return [];

    return data.cities.map(LocationAdapter.mapCityToSelectOption);
  }, [data, isError, isLoading]);

  const shopsOptions: SingleSelectOption[] = useMemo(() => {
    if (isLoading) return [];
    if (isError || !data) return [];
    if (!chosenCityId) {
      return data.stores.map((item) => ({
        value: item.id,
        label: item.title,
      }));
    }

    return data.stores.filter((item) => item.city_id === chosenCityId)
      .map((item) => ({
        value: item.id,
        label: item.title,
      }));
  }, [chosenCityId, data, isError, isLoading]);

  return {
    isLoading,
    shopsOptions,
    cityOptions,
  };
};
