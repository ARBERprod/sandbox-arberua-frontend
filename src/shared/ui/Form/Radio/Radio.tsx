import React, { ChangeEventHandler, useId } from 'react';
import cn from 'classnames';
import styles from './Radio.module.scss';

export interface RadioProps {
   name: string;
   className?: string;
   value?: string;
   label?: string;
   checked: boolean;
   disabled?: boolean;
   hasIndents?: boolean;
   onChange: (name: string, value: string) => void;
   onBlur?: (name: string) => void;
}

export const Radio = ({
  name,
  className,
  value,
  label,
  checked,
  disabled,
  onChange,
  onBlur,
  hasIndents = true,
}: RadioProps) => {
  const id = useId();
  const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  const blurHandler = () => {
    onBlur?.(name);
  };

  return (
    <div className={cn(styles.wrap, 'radio-wrap')}>
      <input
        id={id}
        name={name}
        value={value}
        className={cn(styles.input, className)}
        checked={checked}
        disabled={disabled}
        onChange={changeHandler}
        onBlur={blurHandler}
        type="radio"
      />
      <label htmlFor={id} className={styles.label}>
        <div
          className={cn(styles.icon_wrap, {
            [styles.has_no_indents]: !hasIndents,
          }, styles.radio)}
        >
          {checked && <div className={cn(styles.icon_svg)} />}
        </div>
        <div className={cn(styles.text)}>{label}</div>
      </label>
    </div>
  );
};
