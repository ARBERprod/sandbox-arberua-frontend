import { memo, ReactElement } from 'react';
import cn from 'classnames';
import { TextField } from '@/shared/ui/Form/TextField';
import { SelectField } from '@/shared/ui/Form/SelectField';
import { useForm } from '@/shared/lib/hooks/useForm';
import { PhoneField } from '@/shared/ui/Form/PhoneField';
import { defaultState, FORMAT_OPTIONS, validatorConfig } from './config';
import { ConsultationFormData } from '../../model/ConsultationFormData';
import styles from './ConsultationsForm.module.scss';
import { FieldProps } from '@/shared/types/common';
import { useTranslation } from 'next-i18next';

interface ConsultationsFormProps {
  formId: string;
  className?: string;
  onSubmit: (data: ConsultationFormData) => void;
  consultantPicker: (fieldProps: FieldProps) => ReactElement;
  initData?: Partial<ConsultationFormData>;
}

export const ConsultationsForm = memo(({
  className,
  onSubmit,
  formId,
  initData,
  consultantPicker,
}: ConsultationsFormProps) => {
  const { t } = useTranslation();
  const {
    field,
    submitHandler,
    changeHandler,
  } = useForm({
    initialState: { ...defaultState, ...initData },
    onSubmit,
    validatorConfig: validatorConfig(t),
  });
  const formatChangeHandler = (name: string, value: string) => {
    changeHandler('type', value);
  };

  return (
    <form id={formId} onSubmitCapture={submitHandler} className={cn(styles.root, className)}>
      <SelectField
        label={t('office.format')}
        options={FORMAT_OPTIONS(t)}
        {...field('type')}
        onChange={formatChangeHandler}
      />
      <TextField
        label={t('name')}
        placeholder={t('name')}
        {...field('user_name')}
      />
      <PhoneField
        label={t('phone-number')}
        placeholder={t('phone-code')}
        {...field('phone')}
      />
      {consultantPicker(field('employee_id'))}
    </form>
  );
});
