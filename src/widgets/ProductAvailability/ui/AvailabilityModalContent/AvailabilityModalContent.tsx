import { memo } from 'react';
import cn from 'classnames';
import { Typography } from '@/shared/ui/Typography';
import { useTranslation } from 'next-i18next';
import { SelectField } from '@/shared/ui/Form/SelectField';
import { Button } from '@/shared/ui/Button';
import { AvailabilityAccordionItem } from '../AvailabilityAccordionItem';
import styles from './AvailabilityModalContent.module.scss';
import { useGetProductAvailabilityQuery, QuantityUtils } from '@/entities/Product';
import { Loader } from '@/shared/ui/Loader';
import { ErrorMessage } from '@/shared/ui/Form/ErrorMessage';
import { useSelector } from 'react-redux';
import { productAvailabilitySelectors } from '../../model/productAvailabilitySelectors';
import { useProductAvailabilityActions } from '../../model/productAvailabilitySlice';
import { getFoundStoresCount } from '../../lib/getFoundStoresCount';

interface AvailabilityModalContentProps {
  className?: string;
}

export const AvailabilityModalContent = memo(({
  className,
}: AvailabilityModalContentProps) => {
  const { t } = useTranslation();
  const productId = useSelector(productAvailabilitySelectors.getProductId);
  const activeCity = useSelector(productAvailabilitySelectors.getActiveCityId);
  const { setActiveModal, setActiveCityId } = useProductAvailabilityActions();
  const {
    data,
    isLoading,
    isError,
  } = useGetProductAvailabilityQuery({ productId, activeCityId: activeCity });

  const onCityChange = (name: string, city: string) => {
    setActiveCityId(city);
  };

  const openBookModal = () => {
    setActiveModal({ type: 'booking' });
  };

  if (isLoading) return <Loader centered />;
  if (!data || isError) return <ErrorMessage error="Error" />;

  const { quantities, cities } = data;
  const cityOptions = QuantityUtils.getCityOptions(cities, t);
  return (
    <div className={styles.wrapper}>
      <div className={cn(styles.root, className)}>
        <div className={styles.header}>
          <Typography variant="title-5">{t('availability.modal.title')}</Typography>
        </div>
        <div className={styles.inner}>
          <SelectField
            name="city"
            label={t('availability.label.choose_store')}
            options={cityOptions}
            value={activeCity}
            onChange={onCityChange}
          />
          <div className={styles.qty}>
            <Typography variant="body-3" color="grey-dark">
              {t('availability.search.found_in')}
              {' '}
              {getFoundStoresCount(quantities)}
              {' '}
              {t('availability.search.stores')}
            </Typography>
          </div>
          {quantities.length > 0 && (
            <div className={styles.list}>
              {quantities.map((quantity) => (
                <div className={styles.item} key={quantity.id}>
                  <div className={styles.item_header}>
                    <Typography variant="body-3" color="grey-dark">
                      {quantity.title}
                    </Typography>
                  </div>
                  {quantity.stores.map((shop) => (
                    <AvailabilityAccordionItem
                      className={styles.acc_item}
                      shop={shop}
                      key={shop.url}
                    />
                  ))}
                </div>
              ))}

            </div>
          )}
          <div className={styles.warning}>
            <Typography variant="body-3" color="red">
              {t('book_warning')}
            </Typography>
          </div>
          <div className={styles.btn_wrap}>
            <Button onClick={openBookModal}>{t('book.product.btn.title')}</Button>
          </div>
        </div>
      </div>
    </div>
  );
});
