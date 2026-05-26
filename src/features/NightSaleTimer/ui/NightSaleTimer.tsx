import {
  memo, useCallback, useEffect, useMemo,
} from 'react';
import { useRouter } from 'next/router';
import type { PromotionsItem } from '@/entities/Promotion';
import { useActivePdpShare } from '../model/useActivePdpShare';
import { TimerBlocks } from './TimerBlocks';

const pushTimerEvent = (event: 'night_sale_timer_shown' | 'night_sale_timer_expired', timerLabel: string): void => {
  if (typeof window === 'undefined') return;
  if (!Array.isArray(window.dataLayer)) return;
  window.dataLayer.push({ event, timer_label: timerLabel });
};

interface ActiveTimerProps {
  share: PromotionsItem;
}

const ActiveTimer = memo(({ share }: ActiveTimerProps) => {
  const router = useRouter();
  const endsAt = useMemo(() => Date.parse(share.end_date), [share.end_date]);

  useEffect(() => {
    pushTimerEvent('night_sale_timer_shown', share.title);
  }, [share.title]);

  const handleExpire = useCallback(() => {
    pushTimerEvent('night_sale_timer_expired', share.title);
    router.replace(router.asPath, undefined, { scroll: false });
  }, [router, share.title]);

  return <TimerBlocks label={share.title} endsAt={endsAt} onExpire={handleExpire} />;
});

export const NightSaleTimer = memo(() => {
  const { share } = useActivePdpShare();
  if (!share) return null;
  return <ActiveTimer share={share} />;
});
