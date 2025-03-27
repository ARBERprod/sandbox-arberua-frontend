import { memo } from 'react';
import { CardView } from '@/shared/types/common';
import { TotalLook } from '@/entities/TotalLook';
import { CardsGrid } from '@/shared/ui/CardsGrid';
import { SingleTotalLookCard } from '../SingleTotalLookCard';

interface TotalLookGridProps {
  className?: string;
  totalLooks: TotalLook[];
  view: CardView;
}

export const TotalLookGrid = memo(({
  totalLooks = [],
  view = CardView.NORMAL,
  className,
}:TotalLookGridProps) => {
  if (!totalLooks.length) {
    return null;
  }

  return (
    <CardsGrid items={totalLooks} className={className} view={view}>
      {(totalLook) => <SingleTotalLookCard totalLook={totalLook} view={view} />}
    </CardsGrid>
  );
});
