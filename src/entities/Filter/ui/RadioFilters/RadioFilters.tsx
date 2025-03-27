import { memo } from 'react';
import { RadioField } from '@/shared/ui/Form/RadioField';
import { filterMapper } from '../../lib/filterMapper';
import { RadioFilterItem } from '../../model/types';

interface RadioFiltersProps {
  className?: string;
  value: string;
  filterItem: RadioFilterItem;
  onFilter: (name: string, value: string) => void;
}

export const RadioFilters = memo(({
  className, filterItem, onFilter, value,
}: RadioFiltersProps) => {
  const options = filterItem.values.map(filterMapper.radioFilterMapper);
  return (
    <div className={className}>
      <RadioField options={options} value={value} name={filterItem.slug} onChange={onFilter} />
    </div>
  );
});
