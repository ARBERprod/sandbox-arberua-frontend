import { memo } from 'react';
import cn from 'classnames';
import { Flex, FlexCol } from '@/shared/ui/Flex';
import { Svg } from '@/shared/ui/Svg';
import { Typography } from '@/shared/ui/Typography';
import ClockIcon from '@/shared/assets/icons/clock-3.svg';
import PhoneIcon from '@/shared/assets/icons/phone-5.svg';
import ArrowUpIcon from '@/shared/assets/icons/arrow-up-2.svg';
import ArrowDownIcon from '@/shared/assets/icons/arrow-down-2.svg';
import { useAccordion } from '@/shared/lib/hooks/useAccordion';
import styles from './AvailabilityAccordionItem.module.scss';
import { Shop } from '@/entities/Shop';
import { useTranslation } from 'next-i18next';
import { useProductAvailabilityActions } from '../../model/productAvailabilitySlice';

interface AvailabilityAccordionItemProps {
  className?: string;
  shop: Shop;
}

export const AvailabilityAccordionItem = memo(({
  className,
  shop,
}:AvailabilityAccordionItemProps) => {
  const { ref, toggle, isVisible } = useAccordion<HTMLDivElement>(false);
  const { setActiveView, setActiveShop } = useProductAvailabilityActions();
  const { t } = useTranslation();
  const clickHandler = () => {
    setActiveView('map');
    setActiveShop(shop);
  };

  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.item_content}>
        <div
          className={styles.item_content_header}
          onClick={toggle}
          role="presentation"
        >
          <Flex
            align="start"
            justify="between"
          >
            <FlexCol gap="6">
              <Typography variant="body-2">
                {shop.title}
              </Typography>
              <Typography variant="body-3" color="grey-dark">{shop.pickup_address}</Typography>
            </FlexCol>
            <Svg
              Icon={
                isVisible ? ArrowUpIcon : ArrowDownIcon
              }
              className="ml-1"
            />
          </Flex>
        </div>

        <div
          ref={ref}
          className={styles.item_content_data}
        >
          <Flex align="center" className="mb-1">
            <Svg Icon={ClockIcon} className="mr-1" />
            <Typography variant="body-2" color="grey-dark">
              {shop.pickup_time}
            </Typography>
          </Flex>
          <Flex align="center" className="mb-1">
            <Svg Icon={PhoneIcon} className="mr-1" />
            <Typography variant="body-2" color="grey-dark">
              {shop.pickup_phone}
            </Typography>
          </Flex>
        </div>

        <Typography
          onClick={clickHandler}
          role="presentation"
          underlined
          variant="body-2"
          color="grey-dark"
          className={cn('mb-4', 'hide-tablet-desktop', styles.show)}
        >
          {t('show-on-the-map')}
        </Typography>
      </div>
    </div>
  );
});
