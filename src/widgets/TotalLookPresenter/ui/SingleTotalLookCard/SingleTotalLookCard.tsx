import { memo } from 'react';
import cn from 'classnames';
import { CardView } from '@/shared/types/common';
import { TotalLook, TotalLookCard } from '@/entities/TotalLook';
import styles from './SingleTotalLookCard.module.scss';

interface SingleTotalLookCardProps {
  className?: string;
  totalLook: TotalLook;
  view: CardView;
}

export const SingleTotalLookCard = memo(({
  className,
  totalLook,
  view = CardView.NORMAL,
}:SingleTotalLookCardProps) => (
  <TotalLookCard
    className={cn(styles.root, styles[view], className)}
    totalLook={totalLook}
  />
));
