import type { PromotionsItem } from '@/entities/Promotion';
import { pickPdpShare } from '../pickPdpShare';

const make = (overrides: Partial<PromotionsItem>): PromotionsItem => ({
  title: 'share',
  start_date: '2026-05-28T22:00:00+03:00',
  end_date: '2026-05-29T10:00:00+03:00',
  is_started: true,
  picture: 'p.jpg',
  has_seconds_until_end: 36000,
  show_pdp_timer: true,
  ...overrides,
});

const t = (iso: string) => Date.parse(iso);

describe('pickPdpShare', () => {
  const now = t('2026-05-28T23:00:00+03:00');

  it('returns null on empty/undefined input', () => {
    expect(pickPdpShare([], now)).toBeNull();
    expect(pickPdpShare(undefined, now)).toBeNull();
    expect(pickPdpShare(null, now)).toBeNull();
  });

  it('ignores shares without show_pdp_timer', () => {
    expect(pickPdpShare([make({ show_pdp_timer: false })], now)).toBeNull();
  });

  it('ignores shares that have not started', () => {
    const before = t('2026-05-28T21:59:59+03:00');
    expect(pickPdpShare([make({})], before)).toBeNull();
  });

  it('ignores expired shares (now equals end_date is expired)', () => {
    const atEnd = t('2026-05-29T10:00:00+03:00');
    expect(pickPdpShare([make({})], atEnd)).toBeNull();
  });

  it('returns single valid share', () => {
    const share = make({ title: 'night' });
    expect(pickPdpShare([share], now)?.title).toBe('night');
  });

  it('picks the share with the smallest end_date when multiple are active', () => {
    const early = make({ title: 'early', end_date: '2026-05-29T03:00:00+03:00' });
    const late = make({ title: 'late', end_date: '2026-05-29T10:00:00+03:00' });
    expect(pickPdpShare([late, early], now)?.title).toBe('early');
  });

  it('skips shares with unparseable dates', () => {
    expect(pickPdpShare([make({ start_date: 'garbage' })], now)).toBeNull();
    expect(pickPdpShare([make({ end_date: 'garbage' })], now)).toBeNull();
  });

  it('returns null when local clock has drifted past end_date (clock-drift edge)', () => {
    const driftedNow = t('2026-05-29T10:00:01+03:00');
    expect(pickPdpShare([make({})], driftedNow)).toBeNull();
  });
});
