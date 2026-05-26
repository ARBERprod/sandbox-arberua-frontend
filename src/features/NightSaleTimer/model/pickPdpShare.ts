import type { PromotionsItem } from '@/entities/Promotion';

type ShareWithEnd = { share: PromotionsItem; endMs: number };

const toCandidate = (share: PromotionsItem, nowMs: number): ShareWithEnd | null => {
  if (!share.show_pdp_timer) return null;
  const startMs = Date.parse(share.start_date);
  const endMs = Date.parse(share.end_date);
  if (Number.isNaN(startMs) || Number.isNaN(endMs)) return null;
  if (nowMs < startMs || nowMs >= endMs) return null;
  return { share, endMs };
};

export function pickPdpShare(
  shares: PromotionsItem[] | undefined | null,
  nowMs: number,
): PromotionsItem | null {
  if (!shares?.length) return null;

  const best = shares.reduce<ShareWithEnd | null>((acc, share) => {
    const candidate = toCandidate(share, nowMs);
    if (!candidate) return acc;
    if (!acc || candidate.endMs < acc.endMs) return candidate;
    return acc;
  }, null);

  return best?.share ?? null;
}
