import { SortOption } from '@/shared/types/common';
import { RadioOption } from '@/shared/ui/Form/RadioField';

export const sortOptionsMapper = (sortOptions: SortOption[]): RadioOption[] => sortOptions.map((option) => ({
  value: option.value || '',
  label: option.title,
}));
