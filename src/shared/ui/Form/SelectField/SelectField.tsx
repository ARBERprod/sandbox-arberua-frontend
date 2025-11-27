import cn from 'classnames';
import Select, { components, InputProps, createFilter } from 'react-select';
import { useCallback, useId } from 'react';
import { Label } from '@/shared/ui/Form/Label';
import { ErrorMessage } from '@/shared/ui/Form/ErrorMessage';
import { Option as OptionComponent } from './components/Option';
import { isValueEmpty } from './utils/isValueEmpty';
import { OnChangeSingle, SelectFieldProps, SingleSelectOption } from './types/types';
import { getSelectedOption } from './utils/getSelectedOption';
import { selectClassNames } from './styles/styles';
import { useTranslation } from 'next-i18next';
import styles from './SelectField.module.scss';

// Search only by label, not by value (id)
const filterOption = createFilter({
  ignoreCase: true,
  ignoreAccents: true,
  matchFrom: 'any',
  stringify: (option) => String(option.label),
});

export const SelectField = <Option extends SingleSelectOption>(props: SelectFieldProps<Option>) => {
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
  const changeHandler:OnChangeSingle<Option> = (newValue) => {
    if (newValue) {
      onChange(name, newValue.value);
    }
  };

  const blurHandler = () => {
    onBlur?.(name);
  };

  const selectedValue = isValueEmpty(value) ? null : getSelectedOption(value, options);
  const Input = useCallback((props:InputProps<Option, false>) => <components.Input {...props} autoComplete="new-password" aria-autocomplete="none" />, []);

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
        classNames={selectClassNames<Option>(!!error)}
        onChange={changeHandler}
        onBlur={blurHandler}
        isMulti={false}
        blurInputOnSelect
        noOptionsMessage={() => t('no-results')}
        value={isValueEmpty(value) ? null : selectedValue}
        name={name}
        id={fieldId}
        isDisabled={disabled}
        options={options}
        hideSelectedOptions={false}
        filterOption={filterOption}
        components={{
          Option: OptionComponent,
          Input,
        }}
        {...rest}
      />
      {error && (
        <ErrorMessage error={error} />
      )}
    </div>
  );
};
