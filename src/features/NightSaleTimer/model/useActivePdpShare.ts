import { useEffect, useMemo, useState } from 'react';
import { useGetPromotionsQuery, type PromotionsItem } from '@/entities/Promotion';
import { pickPdpShare } from './pickPdpShare';

const computeNextBoundaryMs = (shares: PromotionsItem[], nowMs: number): number | null => {
  const candidates = shares
    .filter((share) => share.show_pdp_timer)
    .flatMap((share) => [Date.parse(share.start_date), Date.parse(share.end_date)])
    .filter((ms) => !Number.isNaN(ms) && ms > nowMs);

  if (candidates.length === 0) return null;
  return Math.min(...candidates);
};

export const useActivePdpShare = (): { share: PromotionsItem | null; isLoading: boolean } => {
  const { data, isLoading, refetch } = useGetPromotionsQuery(undefined, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const shares = data?.data;
  const [boundaryTick, setBoundaryTick] = useState(0);

  useEffect(() => {
    if (!shares?.length) return undefined;
    const boundary = computeNextBoundaryMs(shares, Date.now());
    if (boundary === null) return undefined;
    const delay = Math.max(0, boundary - Date.now());
    const id = setTimeout(() => {
      refetch();
      // Force re-selection in case the server returns identical data
      // (same shares reference) — useMemo would otherwise keep the stale pick.
      setBoundaryTick((value) => value + 1);
    }, delay);
    return () => clearTimeout(id);
  }, [shares, refetch]);

  const share = useMemo(
    () => pickPdpShare(shares ?? null, Date.now()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [shares, boundaryTick],
  );

  return { share, isLoading };
};
