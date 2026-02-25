import { createFilter } from 'react-select';
import { SingleSelectOption } from '@/shared/ui/Form/SelectField';

const baseFilter = createFilter({
  ignoreCase: true,
  ignoreAccents: true,
  matchFrom: 'any',
  stringify: (option) => String(option.label),
});

type FilterOption = {
  label: string;
  value: string;
  data: SingleSelectOption;
};

export const warehouseFilterOption = (option: FilterOption, rawInput: string): boolean => {
  const trimmed = rawInput.trim();

  if (/^\d+$/.test(trimmed)) {
    return baseFilter(option, `№${trimmed}`);
  }

  return baseFilter(option, rawInput);
};
