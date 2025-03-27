import { memo } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { Typography } from '@/shared/ui/Typography';
import { Flex, FlexCol } from '@/shared/ui/Flex';
import { Svg } from '@/shared/ui/Svg';
import ClockIcon from '@/shared/assets/icons/clock.svg';
import PhoneIcon from '@/shared/assets/icons/phone.svg';
import ChevronRightIcon from '@/shared/assets/icons/arrow-right.svg';
import styles from './ShopItem.module.scss';
import { Shop } from '../../model/types';

interface ShopItemProps {
  className?: string;
  shop: Shop;
}

export const ShopItem = memo(({ shop, className }:ShopItemProps) => (
  <div className={cn(styles.root, className)}>
    <Link href={shop.url} className={styles.arrow}>
      <Svg width={12} height={12} Icon={ChevronRightIcon} />
    </Link>
    <Typography variant="body-3" color="grey-dark">{shop.pickup_address}</Typography>
    <Typography variant="body-2">{shop.title}</Typography>
    <FlexCol gap="6">
      <Flex align="center" gap="4">
        <Svg Icon={ClockIcon} fill="#A1A1A1" />
        <Typography variant="body-2" color="grey-dark">{shop.pickup_time}</Typography>
      </Flex>
      <Flex align="center" gap="6">
        <Svg Icon={PhoneIcon} fill="#A1A1A1" />
        <Typography variant="body-2" color="grey-dark">{shop.pickup_phone}</Typography>
      </Flex>
    </FlexCol>
  </div>
));
