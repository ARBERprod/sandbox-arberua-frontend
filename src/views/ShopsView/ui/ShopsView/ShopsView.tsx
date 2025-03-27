import {
  memo, useMemo, useState, useRef,
} from 'react';
import cn from 'classnames';
import { Container } from '@/shared/ui/Container';
import { PageBreadcrumbs } from '@/shared/ui/Breadcrumps';
import { Typography } from '@/shared/ui/Typography';
import { Flex } from '@/shared/ui/Flex';
import { SelectField, SingleSelectOption } from '@/shared/ui/Form/SelectField';
import { ShopList, useGetShopsQuery } from '@/entities/Shop';
import { Loader, PageLoader } from '@/shared/ui/Loader';
import { ErrorMessage } from '@/shared/ui/Form/ErrorMessage';
import { Button } from '@/shared/ui/Button';
import { Map } from '@/shared/ui/Map';
import { Map as LeafletMap } from 'leaflet';
import { TFunction, useTranslation } from 'next-i18next';
import styles from './ShopsView.module.scss';
import { City } from '@/entities/Location';
import { usePaginate } from '@/widgets/CatalogPagination';

interface ShopsViewProps {
  className?: string;
}

export const ShopsView = memo(({ className }: ShopsViewProps) => {
  const {
    page, pageChangeHandler, merge, moreBtnClickHandler,
  } = usePaginate({ useStatePage: true });
  const mapRef = useRef<LeafletMap|null >(null);
  const [city, setCity] = useState<City | null>(null);
  const { t } = useTranslation();
  const {
    data, isLoading, isError, isFetching,
  } = useGetShopsQuery({
    page,
    city_id: city?.id,
    merge,
  });

  const renderPaginateButton = (t: TFunction) => {
    if (isFetching) return <Loader className={styles.paginate} />;
    if (data?.meta.page.current === data?.meta.page.total) return null;
    return (
      <Button className={styles.paginate} color="light-secondary" onClick={moreBtnClickHandler}>
        {t('show_more')}
      </Button>
    );
  };

  const onCityChange = (name: string, value: string) => {
    const city = data?.data.cities.find((city) => city.id === value);
    if (city) {
      const lat = Number(city.latitude);
      const lng = Number(city.longitude);
      mapRef.current?.flyTo([lat, lng], 12, { animate: false });
      setCity(city);
      pageChangeHandler(1);
    }
  };
  const cityOptions: SingleSelectOption[] = useMemo(() => {
    if (!data) return [];
    return data.data.cities.map((city) => ({ label: city.title, value: city.id }));
  }, [data]);

  if (isLoading) return <PageLoader />;
  if (isError || !data) return <ErrorMessage error={t('error')} />;

  const { stores, breadcrumbs } = data.data;
  return (
    <div className={cn(styles.root, className)}>
      <Container className={styles.container}>
        <PageBreadcrumbs breadcrumbs={breadcrumbs} className={styles.breadcrumbs} />
        <Typography className={cn(styles.title, 'mb-6')} centered variant="title-2">
          {t('menu.stores')}
        </Typography>
        <div className={styles.content}>
          <div className={styles.left}>
            <Flex gap="16">
              <SelectField
                className="w-full"
                label={t('city')}
                placeholder={t('all-cities')}
                name="city"
                value={city?.id || ''}
                onChange={onCityChange}
                options={cityOptions}
              />
            </Flex>
            <ShopList className="mt-8" shops={stores} />

            {renderPaginateButton(t)}
          </div>
          <div className={styles.right}>
            <div className={styles.map_wrapper}>
              <Map
                mapRef={mapRef}
                center={{
                  lat: stores[0]?.latitude,
                  lng: stores[0]?.longitude,
                }}
                markers={stores.map(({ latitude, longitude }) => ({
                  lat: latitude,
                  lng: longitude,
                }))}
                className={styles.map}
              />
            </div>
            <Typography
              className={cn(styles.title, styles.secondary, 'mt-6')}
              centered
              variant="title-2"
            >
              {t('menu.stores')}
            </Typography>
          </div>
        </div>
      </Container>
    </div>
  );
});
