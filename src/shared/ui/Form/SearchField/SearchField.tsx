import React, { useRef } from 'react';
import cn from 'classnames';
import SearchIcon from '@/shared/assets/icons/search-2.svg';
import CloseIcon from '@/shared/assets/icons/close-3.svg';
import { SearchInput } from '@/shared/ui/Form/SearchField';
import { Svg } from '@/shared/ui/Svg';
import { useOutsideClick } from '@/shared/lib/hooks/useOutsideClick';
import styles from './SearchField.module.scss';

export interface SearchFieldProps {
  name: string;
  value: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  showHeaderSearch?: boolean;
  variant?: 'normal' | 'lightColor';
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  onRemove?: () => void;
  onClose?: () => void;
}

export const SearchField = ({
  name,
  value,
  className,
  placeholder,
  disabled,
  showHeaderSearch,
  variant = 'normal',
  onChange,
  onSearch,
  onRemove,
  onClose,
}: SearchFieldProps) => {
  const changeHandler = (name: string, value: string) => {
    onChange?.(value);
  };

  const searchHandler = () => {
    onSearch?.(value); // ?
  };

  const removeHandler = () => {
    onRemove?.();
  };

  const ref = useRef(null);
  useOutsideClick({
    elementRef: ref,
    onOutsideClick: () => onClose?.(),
    enabled: showHeaderSearch,
  });

  return (
    <div className={cn(styles.root, className)} ref={ref}>
      <div className={cn(styles.wrapper)}>
        <div className={cn(styles['input-wrapper'])}>
          <SearchInput
            name={name}
            value={value}
            className={cn(styles.field, styles[variant])}
            placeholder={placeholder}
            disabled={disabled}
            onChange={changeHandler}
          />
        </div>
        <button
          className={cn(styles['icon-wrapper'], styles['icon-wrapper-search'])}
          onClick={searchHandler}
          type="button"
          data-name={name}
        >
          <Svg Icon={SearchIcon} width="24" height="24" />
        </button>
        <button
          className={cn(styles['icon-wrapper'], styles['icon-wrapper-close'])}
          onClick={removeHandler}
          data-name={name}
          data-value={value}
        >
          <Svg Icon={CloseIcon} width="24" height="24" stroke="black-light-2" />
        </button>
      </div>
    </div>
  );
};
