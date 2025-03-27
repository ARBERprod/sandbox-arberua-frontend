export enum FilterType {
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
}

export type FilterItemValue = {
  slug: string;
  title: string;
  is_chosen: boolean;
}

export interface FilterItemBase {
  title: string;
  slug: string;
  type: FilterType;
  values: FilterItemValue[];
}

export interface CheckboxFilterItem extends FilterItemBase {
  type: FilterType.CHECKBOX
}

export interface RadioFilterItem extends FilterItemBase {
  type: FilterType.RADIO
}

export type FilterItem = CheckboxFilterItem | RadioFilterItem
