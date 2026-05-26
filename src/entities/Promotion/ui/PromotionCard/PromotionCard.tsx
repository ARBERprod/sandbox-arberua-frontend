import { memo, useMemo } from 'react';
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
  // Freeze the deadline once per mount so useCountdown's [timestampEnd] effect
  // doesn't reset diff on every tick-driven rerender.
  const endsAt = useMemo(
    () => Date.now() + promotion.has_seconds_until_end * 1000,
    [promotion.has_seconds_until_end],
  );
  const { diff, isExpired } = useCountdown(endsAt);

  return (
    <div className={className}>
      {promotion.link ? (
        <Link href={promotion.link}>
          <PromotionCardContent promotion={promotion} diff={diff} isExpired={isExpired} />
        </Link>
      ) : (
        <PromotionCardContent promotion={promotion} diff={diff} isExpired={isExpired} />
      )}
    </div>
  );
});
