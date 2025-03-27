import { memo } from 'react';
import cn from 'classnames';
import { Button } from '@/shared/ui/Button';
import { PhoneField } from '@/shared/ui/Form/PhoneField';
import { useAuth } from '@/entities/Session';
import { RequiredValidator, useForm } from '@/shared/lib/hooks/useForm';
import { isValidationError } from '@/shared/types/type-guards';
import { validationErrorHandler } from '@/shared/lib/utils/validationErrorHandler';
import { useTranslation } from 'next-i18next';
import { Loader } from '@/shared/ui/Loader';
import { useUpdatePhoneMutation } from '../../api/editPersonalDataApi';
import { useEditPersonalDataActions } from '../../model/slices/editPersonalDataSlice';
import styles from './PhoneNumberForm.module.scss';

interface PhoneNumberFormProps {
  className?: string;
}

export const PhoneNumberForm = memo(({ className }:PhoneNumberFormProps) => {
  const [updatePhone, { isLoading }] = useUpdatePhoneMutation();
  const { t } = useTranslation(['common', 'office-page']);
  const { closeModal } = useEditPersonalDataActions();
  const { userData } = useAuth();
  const onSubmit = async (data: {phone: string}) => {
    try {
      await updatePhone(data).unwrap();
      closeModal();
    } catch (e) {
      if (isValidationError(e)) {
        validationErrorHandler(e);
      }
    }
  };
  const { field, submitHandler } = useForm({
    initialState: { phone: userData ? userData.phone : '' },
    validatorConfig: {
      phone: [new RequiredValidator({ message: `${t('common:enter-phone-number')}` })],
    },
    onSubmit,
  });
  return (
    <form className={cn(styles.root, className)} onSubmit={submitHandler}>
      <div className={styles.inner}>
        <PhoneField label={t('common:phone-number')} {...field('phone')} className={styles.control} />
        {isLoading ? <Loader size={48} centered />
          : <Button type="submit" className="mt-1" size="large" fullWidth>{t('common:save')}</Button>}
      </div>
    </form>
  );
});
