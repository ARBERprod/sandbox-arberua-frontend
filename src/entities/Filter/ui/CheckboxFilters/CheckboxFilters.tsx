import { memo } from 'react';
import { CheckboxGroup, CheckboxOption } from '@/shared/ui/Form/Checkbox';
import { filterMapper } from '../../lib/filterMapper';
import { CheckboxFilterItem } from '../../model/types';

interface CheckboxFiltersProps {
  className?: string;
  filterItem: CheckboxFilterItem;
  value: string[];
  onFilter: (name: string, value: string[]) => void;
}

export const CheckboxFilters = memo(({
  className,
  filterItem,
  onFilter,
  value,
}: CheckboxFiltersProps) => {
  const options: CheckboxOption[] = filterItem.values.map(filterMapper.checkboxFilterMapper);
  return (
    <CheckboxGroup
      name={filterItem.slug}
      onChange={onFilter}
      options={options}
      value={value}
      className={className}
    />
  );
});
