import { MultiSelectOption, SingleSelectOption } from '../types/types';

export const getSelectedOption = <Option extends SingleSelectOption>(value: string,
  options: Option[]): Option | null => options.find((option) => option.value === value) || null;

export const getSelectedOptions = <Option extends MultiSelectOption>(value: string[],
  options: Option[]): Option[] => value.reduce((acc: Option[], valueItem: string) => {
    const option = options.find((op) => op.value === valueItem);
    if (option && !acc.includes(option)) acc.push(option);

    return acc;
  }, []);
