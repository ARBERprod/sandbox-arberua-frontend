import { memo } from 'react';
import cn from 'classnames';
import styles from './ShopList.module.scss';
import { Shop } from '../../model/types';
import { ShopItem } from '../ShopItem';

interface ShopListProps {
  className?: string;
  shops: Shop[];
}

export const ShopList = memo(({ shops = [], className }:ShopListProps) => (
  <div className={cn(styles.root, className)}>
    {shops.map((shop) => <ShopItem key={shop.url} shop={shop} />)}
  </div>
));
