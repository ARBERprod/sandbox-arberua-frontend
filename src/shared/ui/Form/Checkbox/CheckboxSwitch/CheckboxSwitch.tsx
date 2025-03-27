import React, { HTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './CheckboxSwitch.module.scss';

type CheckboxAttributes = Omit<HTMLAttributes<HTMLInputElement>, 'onChange'>;

export interface CheckboxProps extends CheckboxAttributes {
  name: string;
  className?: string;
  value: boolean;
  disabled?: boolean;
  onChange?: (name:string, value: boolean) => void;
}

export const CheckboxSwitch = ({
  name,
  className,
  value,
  disabled,
  onChange,
}: CheckboxProps) => {
  const changeHandler = () => {
    onChange?.(name, !value);
  };

  return (
    <label className={styles.toggleSwitch}>
      <input
        type="checkbox"
        className={cn(styles.input, className)}
        name={name}
        disabled={disabled}
        checked={value}
        onChange={changeHandler}
      />
      <span className={styles.slider} />
    </label>
  );
};

export default CheckboxSwitch;
