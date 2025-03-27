import { memo } from 'react';
import { useTranslation } from 'next-i18next';
import { SelectField } from '@/shared/ui/Form/SelectField';
import { useCitySearch } from '../../lib/useCitySearch';

interface CitySearchFieldProps {
  className?: string;
  initialCityId?: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  onBlur?: (name: string) => void;
  error?: string;
  label?: string;
  placeholder?: string;
}

export const CitySearchField = memo(
  ({
    className,
    name,
    onBlur,
    value,
    label,
    error,
    onChange,
    placeholder,
    initialCityId,
  }: CitySearchFieldProps) => {
    const { t } = useTranslation();
    const { isLoading, options, queryChangeHandler } = useCitySearch(initialCityId);

    return (
      <SelectField
        className={className}
        placeholder={placeholder || t('choose_city')}
        label={label || t('city')}
        isLoading={isLoading}
        onInputChange={queryChangeHandler}
        options={options}
        name={name}
        onBlur={onBlur}
        value={value}
        error={error}
        onChange={onChange}
      />
    );
  },
);
