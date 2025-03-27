import { memo } from 'react';
import cn from 'classnames';
import { Svg } from '@/shared/ui/Svg';
import HeartIcon from '@/shared/assets/icons/heart.svg';
import HeartSelectedIcon from '@/shared/assets/icons/heart-black.svg';
import styles from './Favourites.module.scss';

interface FavouritesProps {
  className?: string;
  quantity?: number| string | false;
  active?: boolean;
}

export const Favourites = memo(({ className, quantity, active }:FavouritesProps) => {
  const Icon = active ? HeartSelectedIcon : HeartIcon;

  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.qty}>{quantity}</div>
      <Svg Icon={Icon} className={styles.svg} />
    </div>
  );
});
