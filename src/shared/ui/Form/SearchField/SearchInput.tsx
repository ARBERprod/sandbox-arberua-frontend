import cn from 'classnames';
import styles from './SearchField.module.scss';
import React, { ChangeEventHandler, forwardRef, useId } from 'react';

interface SearchInputProps{
 name: string;
 value: string;
 onChange:(name:string, value: string) => void;
 className?: string;
 placeholder?: string;
 disabled?:boolean;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(({
  name, value, placeholder, onChange, className, disabled,
}:SearchInputProps, ref) => {
  const id = useId();
  const changeHandler:ChangeEventHandler<HTMLInputElement> = (e) => onChange(e.target.name, e.target.value);
  return (
    <input
      id={id}
      name={name}
      value={value}
      placeholder={placeholder}
      className={cn(styles.searchInput, className)}
      ref={ref}
      disabled={disabled}
      onChange={changeHandler}
      autoComplete="off"
    />
  );
});
