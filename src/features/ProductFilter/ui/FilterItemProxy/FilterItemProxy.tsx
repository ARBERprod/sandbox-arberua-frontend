import { memo } from 'react';
import { useSelector } from 'react-redux';
import {
  CheckboxFilters, FilterItem, FilterType, RadioFilters,
} from '@/entities/Filter';
import { useFilterActions } from '../../model/slices/filterSlice';
import { productFilterSelectors } from '../../model/selectors/productFilterSelectors';
import { useFilterUrlUpdate } from '@/shared/lib/hooks/useFilterUrlUpdate';
import { useQueryFilterUrlUpdate } from '@/shared/lib/hooks/useQueryFilterUrlUpdate';

interface FilterItemProxyProps {
  filtersMode?: 'seo' | 'query';
  filter: FilterItem;
}

export const FilterItemProxy = memo(({
  filter,
  filtersMode = 'seo',
}: FilterItemProxyProps) => {
  const { setValue } = useFilterActions();
  const filterValue = useSelector(productFilterSelectors.getFilterValue(filter.slug));
  const { updateUrl } = useFilterUrlUpdate(filter.slug);
  const { updateUrl: updateQueryUrl } = useQueryFilterUrlUpdate(filter.slug);

  const renderFilter = (filter: FilterItem) => {
    if (filter.type === FilterType.CHECKBOX) {
      const onFilter = (name: string, value: string[]) => {
        setValue({ name, value });
        if (filtersMode === 'seo') {
          updateUrl(value);
        } else {
          updateQueryUrl(value);
        }
      };
      return (
        <CheckboxFilters filterItem={filter} value={filterValue as string[] || []} onFilter={onFilter} />
      );
    }
    if (filter.type === FilterType.RADIO) {
      const onFilter = (name: string, value: string) => {
        setValue({ name, value });
        updateUrl(value);
      };
      return <RadioFilters filterItem={filter} value={filterValue as string} onFilter={onFilter} />;
    }
    return null;
  };
  return (
    <>
      {renderFilter(filter)}
    </>
  );
});
