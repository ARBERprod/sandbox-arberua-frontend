import { memo } from 'react';
import { PromotionsItem } from '../../model/types/Promotions';
import { useCountdown } from '@/shared/lib/hooks/useCountdown';
import Link from 'next/link';
import { PromotionCardContent } from './PromotionCardContent';

interface PromotionCardProps {
  className?: string;
  promotion: PromotionsItem
}

export const PromotionCard = memo(({
  className, promotion,
}:PromotionCardProps) => {
  const { formattedDate } = useCountdown(Date.now() + promotion.has_seconds_until_end * 1000);

  return (
    <div className={className}>
      {promotion.link ? (
        <Link href={promotion.link}>
          <PromotionCardContent promotion={promotion} formattedDate={formattedDate} />
        </Link>
      ) : (
        <PromotionCardContent promotion={promotion} formattedDate={formattedDate} />
      )}
    </div>
  );
});
