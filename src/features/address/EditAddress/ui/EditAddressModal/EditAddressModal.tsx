import { memo } from 'react';
import { useTranslation } from 'next-i18next';
import { isValidationError } from '@/shared/types/type-guards';
import { validationErrorHandler } from '@/shared/lib/utils/validationErrorHandler';
import { MainModal } from '@/shared/ui/Modal';
import {
  Address, AddressForm, AddressFormData, useUpdateAddressMutation,
} from '@/entities/Address';
import styles from './EditAddressModal.module.scss';
import { useCitySearch, useCountrySelect } from '@/entities/Location';
import { SelectField } from '@/shared/ui/Form/SelectField';
import { PageLoader } from '@/shared/ui/Loader';

interface EditAddressModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  address: Address;
}

export const EditAddressModal = memo(({
  className, onClose, isOpen, address,
}: EditAddressModalProps) => {
  const { t } = useTranslation();

  const { isLoading: cityLoading, options: cityOptions, queryChangeHandler } = useCitySearch(address.city.id);
  const { isLoading: countriesLoading, options: countryOptions } = useCountrySelect();

  const [updateAddress, { isLoading }] = useUpdateAddressMutation();

  const submitHandler = async (data: AddressFormData) => {
    try {
      await updateAddress({ address: data, addressId: address.id }).unwrap();
      onClose();
    } catch (e) {
      if (isValidationError(e)) {
        validationErrorHandler(e);
      }
    }
  };

  const initData: Partial<AddressFormData> = {
    country_id: address.country.id,
    city_id: address.city.id,
    flat: address.flat,
    street: address.street,
    house: address.house,
    index: address.index,
  };

  return (
    <MainModal
      isOpen={isOpen}
      onClose={onClose}
      className={className}
      centered
      title={t('edit-data')}
      withBackButton
      unmountOnClose
      lazy
      withCloseBtn
      onBack={onClose}
    >
      {isLoading && <PageLoader />}
      <AddressForm
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
        className={styles.form}
        initData={initData}
        onSubmit={submitHandler}
      />
    </MainModal>
  );
});
