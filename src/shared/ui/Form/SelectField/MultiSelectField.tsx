import React, { useId } from 'react';
import { Label } from '@/shared/ui/Form/Label';
import cn from 'classnames';
import Select from 'react-select';
import { isValueEmpty } from './utils/isValueEmpty';
import { getSelectedOptions } from './utils/getSelectedOption';
import styles from './SelectField.module.scss';
import { MultiSelectFieldProps, MultiSelectOption, OnChangeMultiple } from './types/types';
import { multiSelectClassNames } from './styles/styles';
import { ErrorMessage } from '../ErrorMessage';
import { useTranslation } from 'next-i18next';

export const MultiSelectField = <Option extends MultiSelectOption>(props: MultiSelectFieldProps<Option>) => {
  const {
    name,
    value,
    onChange,
    onBlur,
    options,
    disabled,
    label,
    error,
    className,
    ...rest
  } = props;
  const fieldId = useId();
  const { t } = useTranslation();
  const changeHandler:OnChangeMultiple<Option> = (newValue) => {
    if (newValue) {
      onChange(name, newValue.map((item) => item.value));
    }
  };

  const blurHandler = () => {
    onBlur?.(name);
  };

  const selectedValue = getSelectedOptions(value, options);

  return (
    <div className={cn(styles.root, className)}>
      {label && (
        <Label
          className={cn(styles.label)}
          htmlFor={fieldId}
        >
          {label}
        </Label>
      )}
      <Select
        classNamePrefix={styles.prefix}
        classNames={multiSelectClassNames<Option>(!!error)}
        onChange={changeHandler}
        onBlur={blurHandler}
        isMulti
        blurInputOnSelect
        noOptionsMessage={() => t('no-results')}
        value={isValueEmpty(value) ? null : selectedValue}
        name={name}
        id={fieldId}
        isDisabled={disabled}
        options={options}
        hideSelectedOptions={false}
        {...rest}
      />
      {error && (
        <ErrorMessage error={error} />
      )}
    </div>
  );
};
