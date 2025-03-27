import { memo } from 'react';
import cn from 'classnames';
import { MainSlider, Slide } from '@/shared/ui/Slider';
import { Typography } from '@/shared/ui/Typography';
import { SellerCard } from '../SellerCard';
import styles from './SellersSlider.module.scss';
import { Staff } from '../../model/types';

interface SellersSliderProps {
  className?: string;
  sellers: Staff[];
  title?: string;
}

export const SellersSlider = memo(({
  sellers = [],
  className,
  title,
}: SellersSliderProps) => {
  const slides: Slide[] = sellers.map((seller) => ({
    id: seller.id,
    slide: (
      <SellerCard
        className={cn(styles.seller)}
        seller={seller}
        key={seller.id}
      />
    ),
  }));

  return (
    <div className={className}>
      {title
        && (
          <Typography
            variant="title-2"
            className={styles.title}
          >
            {title}
          </Typography>
        )}
      <MainSlider
        slides={slides}
        classes={{
          slide: cn(
            styles.slide,
          ),
        }}
      />
    </div>

  );
});
