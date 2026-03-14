import { ParsedUrlQuery } from 'querystring';
import { FilterValue } from '../model/types/ProductFilterSchema';
import { FilterItem, FilterType } from '@/entities/Filter';

export const getInitFilterValuesFromQuery = (query: ParsedUrlQuery): { [key: string]: FilterValue } => {
  const getValue = (key: string, value: string | string[]) => {
    const isArrayFilter = Boolean(key.match(/\[\]$/g));
    if (!isArrayFilter) return value;
    if (Array.isArray(value)) return value;
    return [value];
  };
  return Object.entries(query)
    .reduce((acc: { [key: string]: FilterValue }, [key, value]) => {
      if (!value) return acc;
      if (key.includes('filters[')) {
        acc[key] = getValue(key, value);
      }
      return acc;
    }, {} as { [key: string]: FilterValue });
};

export const getInitFilterValues = (
  filters: FilterItem[],
): { [key: string]: FilterValue } => filters.reduce(
  (acc, filter) => {
    if (filter.type === FilterType.CHECKBOX) {
      acc[filter.slug] = filter.values
        .filter((val) => val.is_chosen)
        .map((val) => val.slug);
    }
    if (filter.type === FilterType.RADIO) {
      const chosen = filter.values.find((val) => val.is_chosen);
      if (chosen) {
        acc[filter.slug] = chosen.slug;
      }
    }
    return acc;
  },
    {} as { [key: string]: FilterValue },
);
