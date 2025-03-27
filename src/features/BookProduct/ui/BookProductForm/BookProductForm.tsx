import {
  memo, ReactElement, useEffect, useState,
} from 'react';
import cn from 'classnames';
import { SelectField } from '@/shared/ui/Form/SelectField';
import { PhoneField } from '@/shared/ui/Form/PhoneField';
import { Button } from '@/shared/ui/Button';
import { Typography } from '@/shared/ui/Typography';
import { Flex } from '@/shared/ui/Flex';
import { useTranslation } from 'next-i18next';
import { RequiredValidator, useForm } from '@/shared/lib/hooks/useForm';
import { isValidationError } from '@/shared/types/type-guards';
import { validationErrorHandler } from '@/shared/lib/utils/validationErrorHandler';
import { ReservationType } from '@/entities/Shop';
import { BookProductFormData } from '../../model/types';
import styles from './BookProductForm.module.scss';
import { useBookProduct } from '../../lib/useBookProduct';
import { useUserCity } from '@/entities/Session';
import { Loader } from '@/shared/ui/Loader';
import { useCreateProductReservationMutation } from '../../api/bookProductApi';
import { ProductSku, ProductSkus } from '@/entities/Product';

interface BookProductFormProps {
  className?: string;
  productId: string;
  skus: ProductSku[];
  chosenSkuId: string | null;
  onSuccess?: () => void;
  sizeGridSlot?: ReactElement;
  type: ReservationType;
}

export const BookProductForm = memo(({
  className,
  productId,
  onSuccess,
  sizeGridSlot,
  skus = [],
  chosenSkuId = null,
  type,
}: BookProductFormProps) => {
  const { t } = useTranslation(['common', 'sizes']);

  const [reserveProduct, { isLoading }] = useCreateProductReservationMutation();
  const [activeSkuId, setActiveSkuId] = useState<string | null>(chosenSkuId);
  const [activeIdentifierSync, setActiveIdentifierSync] = useState<string>('');

  useEffect(() => {
    const sku = skus.find((sku) => sku.id === chosenSkuId);
    setActiveIdentifierSync(sku?.identifier_sync || '');
    setActiveSkuId(chosenSkuId);
  }, [chosenSkuId, skus]);

  const changeChosenSku = (skuId: string, skuIdentifierSync: string) => {
    setActiveSkuId(skuId);
    setActiveIdentifierSync(skuIdentifierSync);
  };

  const onSubmit = async (data: BookProductFormData) => {
    try {
      await reserveProduct({
        product_id: activeSkuId || productId,
        city_id: data?.city,
        store_id: data?.store_id,
        phone: data?.phone,
        type,
      }).unwrap();
      onSuccess?.();
    } catch (e) {
      if (isValidationError(e)) {
        validationErrorHandler(e);
      }
    }
  };
  const userCityId = useUserCity();

  const {
    field,
    submitHandler,
    formState,
  } = useForm({
    initialState: {
      city: userCityId?.id || '',
      store_id: '',
      phone: '',
    },
    validatorConfig: {
      city: [new RequiredValidator({ message: t('validation.required') })],
      phone: [new RequiredValidator({ message: t('validation.required') })],
      store_id: [new RequiredValidator({ message: t('validation.required') })],
    },
    onSubmit,
  });

  const {
    isLoading: optionsLoading,
    cityOptions,
    shopsOptions,
  } = useBookProduct(activeIdentifierSync || productId, formState.city.value);

  return (
    <form onSubmit={submitHandler}>
      <Typography variant="body-2" centered className="pb-1 pt-4">
        {t('sizes:size')}
        :
      </Typography>
      <Flex
        justify="center"
        align="start"
        gap="10"
        className={styles.sizes}
      >
        <ProductSkus
          activeSkuId={activeSkuId}
          disableIfIsNotSale
          onClick={(sku) => changeChosenSku(sku.id, sku.identifier_sync)}
          skus={skus}
        />
        {sizeGridSlot}
      </Flex>
      <SelectField
        className="mb-4"
        label={t('book.product.label.choose_city')}
        options={cityOptions}
        isLoading={optionsLoading}
        placeholder={t('book.product.label.choose_city')}
        {...field('city')}
      />
      <SelectField
        className="mb-4"
        label={t('book.product.label.choose_store')}
        options={shopsOptions}
        isLoading={optionsLoading}
        placeholder={t('book.product.label.choose_store')}
        {...field('store_id')}
      />
      <PhoneField
        className="mb-4"
        label={t('book.product.label.phone')}
        {...field('phone')}
      />
      {isLoading ? <Loader centered />
        : (
          <Button
            className={cn(styles.root, className, 'mt-5')}
            fullWidth
            type="submit"
            size="large"
          >
            {t('to_book')}
          </Button>
        )}
    </form>
  );
});
