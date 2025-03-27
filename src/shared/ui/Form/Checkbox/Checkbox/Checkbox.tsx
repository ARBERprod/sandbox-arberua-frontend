import React, {
  CSSProperties, HTMLAttributes, ReactNode, useId,
} from 'react';
import cn from 'classnames';
import { COLORS } from '@/shared/config/colors';
import styles from './Checkbox.module.scss';
import { ErrorMessage } from '@/shared/ui/Form/ErrorMessage';

type CheckboxAttributes = Omit<HTMLAttributes<HTMLInputElement>, 'onChange' | 'onBlur'>;

export interface CheckboxProps extends CheckboxAttributes {
   name: string;
   className?: string;
   value: boolean;
   label?: ReactNode;
   disabled?: boolean;
   color?: string;
   onChange?: (name:string, value: boolean) => void;
   onBlur?: (name:string) => void;
  error?: string;
}

export const Checkbox = ({
  name,
  className,
  value,
  label,
  disabled,
  color,
  onChange,
  onBlur,
  error,
}: CheckboxProps) => {
  const id = useId();

  const changeHandler = () => {
    onChange?.(name, !value);
  };

  const blurHandler = () => {
    onBlur?.(name);
  };

  const borderColor = color === 'white' ? COLORS['grey-light'] : color;

  return (
    <div className={styles.wrap}>
      <input
        onBlur={blurHandler}
        id={id}
        name={name}
        className={cn(styles.input, className)}
        checked={value}
        disabled={disabled}
        onChange={changeHandler}
        type="checkbox"
      />
      <label htmlFor={id} className={styles.label}>
        <div className={cn(styles.icon_wrap, styles.checkbox)}>
          {value && '✔'}
        </div>
        <div className={cn(styles.content)}>
          {color && (
            <div
              className={styles.icon}
              style={{
                '--color': color,
                '--border-color': borderColor,
              } as CSSProperties}
            />
          )}
          {label && <div className={cn(styles.text)}>{label}</div>}
        </div>
      </label>
      {error && <ErrorMessage error={error} />}
    </div>
  );
};
