import { CheckboxOption } from '@/shared/ui/Form/Checkbox';
import { RadioOption } from '@/shared/ui/Form/RadioField';
import { FilterItemValue } from '../model/types';

class FilterMapper {
  checkboxFilterMapper(value: FilterItemValue): CheckboxOption {
    return {
      label: value.title,
      value: value.slug,
    };
  }

  radioFilterMapper(value: FilterItemValue): RadioOption {
    return {
      label: value.title,
      value: value.slug,
    };
  }
}

export const filterMapper = new FilterMapper();
