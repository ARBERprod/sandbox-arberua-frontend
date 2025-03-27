import { ActionMeta, OnChangeValue, Props } from 'react-select';
import { ReactElement } from 'react';

export interface SingleSelectOption {
  label: string | ReactElement;
  value: string;
}

export interface MultiSelectOption {
  label: ReactElement | string;
  value: string;
}

export type OnChangeSingle<Option> = (newValue: OnChangeValue<Option, false>,
  actionMeta: ActionMeta<Option>) => void

export interface SelectFieldProps<
  Option extends SingleSelectOption,
> extends Partial<Omit<Props<Option, false>, 'onChange' | 'value' | 'onBlur'>> {
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  onBlur?: (name: string) => void;
  options: Option[];
  disabled?: boolean;
  label?: string;
  error?: string;
  className?: string;
}

export type OnChangeMultiple<Option> = (newValue: OnChangeValue<Option, true>, actionMeta: ActionMeta<Option>) => void;

export interface MultiSelectFieldProps<
  Option extends MultiSelectOption
> extends Partial<Omit<Props<Option, true>, 'onChange' | 'value' | 'onBlur'>> {
  name: string;
  value: string[];
  onChange: (name: string, value: string[]) => void;
  onBlur?: (name: string) => void;
  options: Option[];
  disabled?: boolean;
  label?: string;
  error?: string;
  className?: string;
}
