import { memo } from 'react';
import cn from 'classnames';
import { PromotionCard } from '../PromotionCard';
import styles from './PromotionsGrid.module.scss';
import { PromotionsItem } from '../../model/types/Promotions';

interface PromotionsGridProps {
  className?: string;
  promotions: PromotionsItem[];
}

export const PromotionsGrid = memo(({
  promotions = [],
  className,
}: PromotionsGridProps) => (
  <div className={cn(styles.root, className)}>
    {promotions.map(
      // eslint-disable-next-line react/no-array-index-key
      (promotion, index) => (<PromotionCard className={styles.promotion} promotion={promotion} key={index} />),
    )}
  </div>
));
