import React, { memo, useId } from 'react';
import PhoneInput, { PhoneInputProps } from 'react-phone-input-2';
import cn from 'classnames';
import { Label } from '@/shared/ui/Form/Label';
import { ErrorMessage } from '@/shared/ui/Form/ErrorMessage';
import styles from './PhoneField.module.scss';

interface PhoneFieldProps {
  name: string;
  onChange: (name: string, value: string) => void;
  value: string;
  label?: string;
  error?: string;
  placeholder?: string;
  onBlur?: (name: string) => void;
  className?: string;
}

export const PhoneField = memo(({
  className, name, placeholder, onChange, onBlur, label, error, value,
}:PhoneFieldProps) => {
  const id = useId();
  const changeHandler: PhoneInputProps['onChange'] = (value: string) => {
    onChange(name, value);
  };

  const blurHandler: PhoneInputProps['onBlur'] = (e) => {
    onBlur?.(e.target.name);
  };
  return (
    <div className={cn(styles.root, {
      [styles.error]: Boolean(error),
    }, className)}
    >
      {label && <Label htmlFor={id} className={styles.label}>{label}</Label>}
      <PhoneInput
        specialLabel=""
        masks={{ ua: '..-...-..-..' }}
        enableAreaCodes
        enableAreaCodeStretch
        country="ua"
        placeholder={placeholder || '+380'}
        onBlur={blurHandler}
        onChange={changeHandler}
        value={value}
        inputClass={styles.input}
        inputProps={{
          name,
        }}
      />
      {error && (
        <ErrorMessage error={error} />
      )}
    </div>
  );
});
