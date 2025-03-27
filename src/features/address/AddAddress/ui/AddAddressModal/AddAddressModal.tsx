import { memo } from 'react';
import { MainModal } from '@/shared/ui/Modal';
import { useTranslation } from 'next-i18next';
import { AddressForm, AddressFormData, useCreateAddressMutation } from '@/entities/Address';
import { isValidationError } from '@/shared/types/type-guards';
import { validationErrorHandler } from '@/shared/lib/utils/validationErrorHandler';
import styles from './AddAddressModal.module.scss';
import { PageLoader } from '@/shared/ui/Loader';
import { SelectField } from '@/shared/ui/Form/SelectField';
import { useCitySearch, useCountrySelect } from '@/entities/Location';

interface AddAddressModalProps {
  className?: string;
  onClose: () => void;
  isOpen: boolean;
}

export const AddAddressModal = memo(({
  className,
  isOpen,
  onClose,
}: AddAddressModalProps) => {
  const { t } = useTranslation();
  const { isLoading: cityLoading, options: cityOptions, queryChangeHandler } = useCitySearch();
  const { isLoading: countriesLoading, options: countryOptions } = useCountrySelect();
  const [createAddress, { isLoading }] = useCreateAddressMutation();

  const submitHandler = async (data: AddressFormData) => {
    try {
      await createAddress(data)
        .unwrap();
      onClose();
    } catch (e) {
      if (isValidationError(e)) {
        validationErrorHandler(e);
      }
    }
  };

  return (
    <MainModal
      isOpen={isOpen}
      onClose={onClose}
      className={className}
      centered
      title={t('add_address')}
      withBackButton
      unmountOnClose
      lazy
      withCloseBtn
      onBack={onClose}
    >
      {isLoading && <PageLoader />}
      <AddressForm
        className={styles.form}
        countryFieldSlot={(field) => (
          <SelectField
            label={t('country')}
            placeholder={t('choose_country')}
            options={countryOptions}
            isLoading={countriesLoading}
            {...field}
          />
        )}
        cityFieldSlot={(field) => (
          <SelectField
            label={t('city')}
            placeholder={t('choose_city')}
            options={cityOptions}
            onInputChange={queryChangeHandler}
            isLoading={cityLoading}
            {...field}
          />
        )}
        onSubmit={submitHandler}
      />
    </MainModal>
  );
});
