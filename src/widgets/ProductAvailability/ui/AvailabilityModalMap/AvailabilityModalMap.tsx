import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { useGetProductAvailabilityQuery } from '@/entities/Product';
import { Typography } from '@/shared/ui/Typography';
import { Svg } from '@/shared/ui/Svg';
import BackIcon from '@/shared/assets/icons/arrow-left.svg';
import { Coords, Map } from '@/shared/ui/Map';
import styles from './AvailabilityModalMap.module.scss';
import { useProductAvailabilityActions } from '../../model/productAvailabilitySlice';
import { productAvailabilitySelectors } from '../../model/productAvailabilitySelectors';

interface AvailabilityModalMapProps {
  className?: string;
}

export const AvailabilityModalMap = memo(({
  className,
}: AvailabilityModalMapProps) => {
  const {
    setActiveView,
    setActiveShop,
  } = useProductAvailabilityActions();
  const activeShop = useSelector(productAvailabilitySelectors.getActiveShop);
  const productId = useSelector(productAvailabilitySelectors.getProductId);
  const activeCity = useSelector(productAvailabilitySelectors.getActiveCityId);
  const { data } = useGetProductAvailabilityQuery({
    productId,
    activeCityId: activeCity,
  });
  const onBack = () => {
    setActiveView('list');
    setActiveShop(null);
  };

  const markers = useMemo(() => {
    if (activeShop) {
      const marker = {
        lat: activeShop.latitude,
        lng: activeShop.longitude,
      };
      return [marker];
    }
    if (!data) return [];
    return data.quantities.reduce((acc, q) => acc.concat(q.stores.map((shop) => ({
      lat: shop.latitude,
      lng: shop.longitude,
    }))), [] as Coords[]);
  }, [activeShop, data]);

  return (
    <div className={styles.wrapper}>
      <div className={cn(styles.root, className)}>
        <button className={styles.backBtn} onClick={onBack}>
          <Svg Icon={BackIcon} stroke="black-light-2" width={7} height={14} />
        </button>
        <div className={styles.header}>
          {activeShop
            && <Typography variant="body-2" centered>{activeShop.title}</Typography>}
        </div>
        <div className={styles.map}>
          {data
            && (
              <Map
                center={markers[0]}
                markers={markers}
              />
            )}
        </div>
      </div>
    </div>
  );
});
