import { memo } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { Typography } from '@/shared/ui/Typography';
import { Flex } from '@/shared/ui/Flex';
import { Svg } from '@/shared/ui/Svg';
import PhoneIcon from '@/shared/assets/icons/phone.svg';
import ClockIcon from '@/shared/assets/icons/clock.svg';
// import { FullscreenImageSlider } from '@/shared/ui/Slider';
import { useBoolean } from '@/shared/lib/hooks/useBoolean';
import { MapModal } from '@/shared/ui/Modal';
import { Shop } from '../../model/types';

import styles from './ShopDetails.module.scss';

interface ShopDetailsProps {
  className?: string;
  shop: Shop;
}

export const ShopDetails = memo(({
  shop,
  className,
}: ShopDetailsProps) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useBoolean(false);

  return (
    <div className={cn(styles.root, className)}>
      <Flex direction="column-reverse" className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.titles}>
            <Typography variant="title-3" className={styles.title}>{shop.title}</Typography>
            <button
              onClick={setIsModalOpen.on}
              className={styles.subtitle}
            >
              <Typography
                as="span"
                variant="body-2"
                color="grey-dark"
              >
                {t('look_at_the_map')}
              </Typography>
            </button>
          </div>
          <Flex gap="12" direction="column" className={styles.info}>
            <Flex gap="4" align="center">
              <Svg Icon={ClockIcon} />
              <Typography variant="body-2" color="grey-dark">{shop.pickup_time}</Typography>
            </Flex>
            <Flex gap="4" align="center">
              <Svg Icon={PhoneIcon} />
              <Typography variant="body-2" color="grey-dark">{shop.pickup_phone}</Typography>
            </Flex>
          </Flex>
        </div>
        <MapModal
          title={shop.title}
          center={{
            lng: shop.longitude,
            lat: shop.latitude,
          }}
          isOpen={isModalOpen}
          onClose={setIsModalOpen.off}
        />
        {/* {shop?.pictures && !!shop?.pictures.length && <FullscreenImageSlider items={shop.pictures} />} */}
      </Flex>
    </div>
  );
});
