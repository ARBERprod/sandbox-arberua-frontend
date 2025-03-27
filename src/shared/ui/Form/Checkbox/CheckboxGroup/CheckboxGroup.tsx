import { memo } from 'react';
import cn from 'classnames';
import styles from './CheckboxGroup.module.scss';
import { Checkbox } from '../Checkbox/Checkbox';

export interface CheckboxOption {
  value: string;
  color?: string;
  label?: string;
  disabled?: boolean;
}

interface CheckboxGroupProps {
  name: string;
  options: CheckboxOption[];
  value: string[];
  onChange?: (name: string, list: string[]) => void;
  className?: string;
}

export const CheckboxGroup = memo(({
  className, options = [], value, onChange, name,
}: CheckboxGroupProps) => {
  const changeHandler = (optionValue: string) => (name: string, bool: boolean) => {
    if (bool) {
      onChange?.(name, [...value, optionValue]);
    } else {
      onChange?.(name, value.filter((optValue) => optValue !== optionValue));
    }
  };
  return (
    <div className={cn(styles.root, className)}>
      {options.map((option) => (
        <Checkbox
          color={option.color}
          name={name}
          value={value.includes(option.value)}
          label={option.label}
          onChange={changeHandler(option.value)}
          disabled={option.disabled}
          key={option.value}
        />
      ))}
    </div>
  );
});
