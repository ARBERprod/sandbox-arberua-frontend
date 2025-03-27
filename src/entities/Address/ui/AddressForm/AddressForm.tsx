import { memo, ReactElement } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { useForm } from '@/shared/lib/hooks/useForm';
import { TextField } from '@/shared/ui/Form/TextField';
import { Flex } from '@/shared/ui/Flex';
import { Button } from '@/shared/ui/Button';
import { defaultData, validatorConfig } from './config';
import { AddressFormData } from '../../model/AddressFormData';
import styles from './AddressForm.module.scss';
import { FieldProps } from '@/shared/types/common';

interface AddressFormProps {
  className?: string;
  initData?: Partial<AddressFormData>;
  onSubmit: (data: AddressFormData) => void;
  cityFieldSlot: (fieldProps: FieldProps) => ReactElement;
  countryFieldSlot: (fieldProps: FieldProps) => ReactElement;
}

export const AddressForm = memo(({
  className,
  initData,
  onSubmit,
  cityFieldSlot,
  countryFieldSlot,
}: AddressFormProps) => {
  const { t } = useTranslation();
  const {
    field,
    submitHandler,
  } = useForm({
    initialState: { ...defaultData, ...initData },
    validatorConfig: validatorConfig(t),
    onSubmit,
  });
  return (
    <form onSubmit={submitHandler} className={cn(styles.root, className)}>
      {countryFieldSlot(field('country_id'))}
      {cityFieldSlot(field('city_id'))}
      <TextField
        {...field('index')}
        placeholder={t('enter_zip')}
        label={t('index')}
        size="big"
      />
      <TextField
        {...field('street')}
        placeholder={t('street_name')}
        label={t('street')}
        size="big"
      />

      <Flex gap="16" className={styles.form_row}>
        <TextField
          {...field('house')}
          placeholder={t('house')}
          label={t('building')}
          size="big"
        />
        <TextField
          {...field('flat')}
          placeholder={t('flat')}
          label={t('appartment')}
          size="big"
        />
      </Flex>
      <Button className={styles.button} type="submit" size="large" fullWidth>{t('save')}</Button>
    </form>
  );
});
