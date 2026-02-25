import { memo, ReactElement } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { RequiredValidator, useForm } from '@/shared/lib/hooks/useForm';
import { Typography } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import { PhoneField } from '@/shared/ui/Form/PhoneField';
import { SelectField } from '@/shared/ui/Form/SelectField';
import { RadioField } from '@/shared/ui/Form/RadioField';
import { TextField } from '@/shared/ui/Form/TextField';
import { Checkbox } from '@/shared/ui/Form/Checkbox';
import { TextAreaField } from '@/shared/ui/Form/TextAreaField';
import { Flex, FlexCol } from '@/shared/ui/Flex';
import { useCheckout } from '../../lib/useCheckout';
import { CheckoutFormData } from '../../model/types/CheckoutFormData';
import { getInitialState } from '../../lib/getInitialState';
import styles from './CheckoutForm.module.scss';
import { CitySearchField } from '@/entities/Location';
import { useWarehouses } from '../../lib/useWarehouses';
import { warehouseFilterOption } from '../../lib/warehouseFilterOption';
import { useSelector } from 'react-redux';
import { cartSelectors } from '@/entities/Cart';
import { measurementsPost, pushDataLayerEvent } from '@/shared/lib/analytics/dataLayer';
import { useUserId } from '@/entities/Session';

interface CheckoutFormProps {
  className?: string;
  initState?: Partial<CheckoutFormData>;
  cartSlot?: ReactElement;
  promoCode: string;
}

export const CheckoutForm = memo(({
  className,
  cartSlot,
  initState,
}: CheckoutFormProps) => {
  const { t } = useTranslation(['common', 'checkout-page', 'office-page']);
  const { cartData } = useSelector(cartSelectors.getCart);
  const {
    paymentMethodsOptions,
    deliveryMethodsOptions,
    getChosenDeliveryMethod,
    submitCheckoutForm,
    getAddressDeliveryMethodId,
  } = useCheckout();
  const clientId = useUserId();

  const {
    submitHandler, field, changeHandler, formState,
  } = useForm({
    initialState: getInitialState(initState),
    validatorConfig: {
      privacy: [new RequiredValidator({ message: t('validation.required') })],
      delivery_method_id: [new RequiredValidator({ message: t('validation.required') })],
    },
    onSubmit: submitCheckoutForm,
  });

  const chosenDeliveryMethod = getChosenDeliveryMethod(formState.delivery_method_id.value);

  const cityChangeHandler = (name: string, value: string) => {
    changeHandler('warehouse_id', '');
    changeHandler('address.street', '');
    changeHandler('address.house', '');
    changeHandler('address.flat', '');
    changeHandler(name, value);
  };

  const { isLoading: wareHousesLoading, warehousesOptions } = useWarehouses({
    deliveryMethod: chosenDeliveryMethod,
    cityId: formState.city_id.value,
    onEmptyResults: () => {
      const addressDeliveryMethodId = getAddressDeliveryMethodId();
      if (addressDeliveryMethodId) {
        changeHandler('delivery_method_id', addressDeliveryMethodId);
      }
      changeHandler('warehouse_id', '');
    },
  });

  const showNewPostWarehouses = chosenDeliveryMethod?.type === 'storage' && chosenDeliveryMethod.code !== 'store';
  const showStoreWarehouses = chosenDeliveryMethod?.type === 'storage' && chosenDeliveryMethod.code === 'store';

  const price = cartData?.total || cartData?.totals.reduce(
    (min, total) => (total.price.value < min.value ? total.price : min),
    cartData?.totals[0].price,
  );

  return (
    <form onSubmit={submitHandler} className={cn(styles.root, className)}>
      <FlexCol gap="16" className="mb-9">
        <Typography className="mb-5" variant="title-4">{t('checkout-page:checkout.recipient')}</Typography>
        <TextField label={t('common:last_name')} placeholder={t('common:last_name')} {...field('customer.last_name')} />
        <TextField
          label={t('common:first_name')}
          placeholder={t('common:first_name')}
          {...field('customer.first_name')}
        />
        <TextField label={t('common:surname')} placeholder={t('common:surname')} {...field('customer.middle_name')} />
        <PhoneField label={t('common:phone-number')} {...field('customer.phone')} />
        <TextField label={t('common:email')} placeholder={t('common:email')} {...field('customer.email')} />
      </FlexCol>
      <FlexCol gap="16" className="mb-9">
        <Typography className="mb-5" variant="title-4">{t('checkout-page:checkout.delivery')}</Typography>
        <CitySearchField {...field('city_id')} onChange={cityChangeHandler} />

        <RadioField
          options={deliveryMethodsOptions || []}
          {...field('delivery_method_id')}
          onCustomChange={(selectedOption) => {
            const items = cartData?.items.map((item) => ({
              id: item.parent_id || item.id,
              name: item.title,
              category: item.category,
              brand: item.brand,
              variant: item.variant,
              price: item.cost.value,
              quantity: item.quantity,
              currency: 'UAH',
            }));

            const itemsMeasurements = cartData?.items.map((item) => ({
              item_id: item.parent_id || item.id,
              item_name: item.title,
              affiliation: 'Онлайн-магазин',
              // coupon: '',
              currency: 'UAH',
              // discount: '',
              // index: 0,
              item_brand: item.brand,
              item_category: item.category,
              // item_list_id: product.category.id,
              // item_list_name: product.category.title,
              item_variant: item.variant || '',
              price: item.cost.value || 0,
              quantity: item.quantity,
            }));

            const value = itemsMeasurements?.reduce((acc, item) => acc + item.price * item.quantity, 0);

            const params = {
              currency: 'UAH',
              value: value || 0,
              items: itemsMeasurements,
              shipping_tier: selectedOption.label,
            };

            measurementsPost({
              name: 'add_shipping_info',
              params,
              client_id: clientId,
            });

            pushDataLayerEvent({
              event: 'add_shipping_info',
              ecommerce: {
                shipping_tier: selectedOption.label,
                value: price,
                currency: 'UAH',
                items,
              },
            });
          }}
        />
        {showNewPostWarehouses && (
          <SelectField
            {...field('warehouse_id')}
            options={warehousesOptions}
            isLoading={wareHousesLoading}
            label={t('branch-number')}
            placeholder={t('select-branch-number')}
            filterOption={warehouseFilterOption}
          />
        )}
        {showStoreWarehouses && (
          <SelectField
            {...field('warehouse_id')}
            options={warehousesOptions}
            isLoading={wareHousesLoading}
            label={t('store-address')}
            placeholder={t('select-store-address')}
          />
        )}
        {chosenDeliveryMethod?.type === 'address' && (
          <>
            <TextField
              {...field('address.street')}
              label={t('street')}
              placeholder={t('street_name')}
            />
            <Flex
              gap="16"
              direction={{
                desktop: 'row',
                'mobile-tablet': 'column',
              }}
            >
              <TextField
                {...field('address.house')}
                label={t('house')}
                placeholder={t('house-number')}
              />
              <TextField
                {...field('address.flat')}
                label={t('flat')}
                placeholder={t('flat')}
              />
            </Flex>
          </>
        )}
      </FlexCol>
      <FlexCol gap="16">
        <Typography variant="title-4">{t('checkout-page:checkout.payment')}</Typography>
        <RadioField
          options={paymentMethodsOptions || []}
          {...field('payment_method_id')}
          onCustomChange={(selectedOption) => {
            const items = cartData?.items.map((item) => ({
              id: item.parent_id || item.id,
              name: item.title,
              category: item.category,
              brand: item.brand,
              variant: item.variant,
              price: item.cost.value,
              quantity: item.quantity,
              currency: 'UAH',
            }));

            const itemsMeasurements = cartData?.items.map((item) => ({
              item_id: item.parent_id || item.id,
              item_name: item.title,
              affiliation: 'Онлайн-магазин',
              // coupon: '',
              currency: 'UAH',
              // discount: '',
              // index: 0,
              item_brand: item.brand,
              item_category: item.category,
              // item_list_id: product.category.id,
              // item_list_name: product.category.title,
              item_variant: item.variant || '',
              price: item.cost.value || 0,
              quantity: item.quantity,
            }));

            const value = itemsMeasurements?.reduce((acc, item) => acc + item.price * item.quantity, 0);

            const params = {
              currency: 'UAH',
              value: value || 0,
              items: itemsMeasurements,
              payment_type: selectedOption.label,
            };

            measurementsPost({
              name: 'add_payment_info',
              params,
              client_id: clientId,
            });

            pushDataLayerEvent({
              event: 'add_payment_info',
              ecommerce: {
                payment_type: selectedOption.label,
                value: price,
                currency: 'UAH',
                items,
              },
            });
          }}
        />

        <TextAreaField
          className="mt-9"
          label={t('checkout-page:checkout.comment')}
          placeholder={t('checkout-page:checkout.placeholder1')}
          {...field('note')}
        />
      </FlexCol>
      {cartSlot
        && (
          <div className={styles.slot}>
            {cartSlot}
          </div>
        )}
      <Button type="submit" className={styles.button} size="large" fullWidth>{t('common:place_order')}</Button>
      <FlexCol gap="12">
        <Checkbox label={t('checkout-page:checkout.label')} {...field('call_reject')} />
        <Checkbox
          label={t('checkout-page:checkout.label1')}
          {...field('email_subscribe')}
        />
        <Flex gap="4" align="end">
          <Checkbox
            {...field('privacy')}
            label={(
              <>
                {t('checkout-page:checkout.label2')}
                {' '}
                <Link
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                  href="/pages/terms-of-use"
                >
                  <Typography as="span" variant="body-3" underlined>
                    {t('common:menu.terms-use')}
                  </Typography>
                </Link>
                {' '}
                (
                {t('required')}
                )
              </>
            )}
          />
        </Flex>
      </FlexCol>
    </form>
  );
});
