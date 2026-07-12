import type { Shop } from '@/entities/Shop';
import { PickupPointsData } from '../../api/types';
import { derivePickupAvailability, isPickupUnavailable } from '../derivePickupAvailability';

const shop = { id: 'store-1', title: 'ARBER' } as unknown as Shop;

const base: PickupPointsData = {
  points: [],
  unavailable_items: [],
  no_common_store: false,
  stock_check_unavailable: false,
};

describe('derivePickupAvailability', () => {
  it('returns loading while the query is in flight', () => {
    expect(derivePickupAvailability(undefined, true)).toEqual({ kind: 'loading' });
  });

  it('returns idle when there is no data and no request in flight', () => {
    expect(derivePickupAvailability(undefined, false)).toEqual({ kind: 'idle' });
  });

  it('state 2: non-empty points → available', () => {
    const result = derivePickupAvailability({ ...base, points: [shop] }, false);
    expect(result).toEqual({ kind: 'available', points: [shop] });
  });

  it('state 1: stock_check_unavailable → stock_check_unavailable', () => {
    const result = derivePickupAvailability({ ...base, stock_check_unavailable: true }, false);
    expect(result).toEqual({ kind: 'stock_check_unavailable' });
  });

  it('state 1 wins by precedence even if the backend erroneously sent other fields', () => {
    const result = derivePickupAvailability({
      points: [shop],
      unavailable_items: [{ product_id: 'p1', title: 'T', slug: 't' }],
      no_common_store: true,
      stock_check_unavailable: true,
    }, false);
    expect(result).toEqual({ kind: 'stock_check_unavailable' });
  });

  it('points win over unavailable_items when the backend sends both (precedence, not mutual exclusion)', () => {
    const result = derivePickupAvailability({
      ...base,
      points: [shop],
      unavailable_items: [{ product_id: 'p1', title: 'T', slug: 't' }],
    }, false);
    expect(result).toEqual({ kind: 'available', points: [shop] });
  });

  it('state 3: empty points + unavailable_items → hard_blocker with items', () => {
    const items = [{ product_id: 'p1', title: 'Куртка', slug: 'kurtka' }];
    const result = derivePickupAvailability({ ...base, unavailable_items: items }, false);
    expect(result).toEqual({ kind: 'hard_blocker', items });
  });

  it('state 4: empty points + no_common_store → no_common_store', () => {
    const result = derivePickupAvailability({ ...base, no_common_store: true }, false);
    expect(result).toEqual({ kind: 'no_common_store' });
  });

  it('state 5: all signals empty → unavailable (default fallback)', () => {
    expect(derivePickupAvailability(base, false)).toEqual({ kind: 'unavailable' });
  });

  describe('malformed response (fail-closed, no crash)', () => {
    it('degrades to unavailable when arrays and flags are missing entirely', () => {
      expect(derivePickupAvailability({} as any, false)).toEqual({ kind: 'unavailable' });
    });

    it('still honours stock_check_unavailable precedence when arrays are missing', () => {
      const result = derivePickupAvailability({ stock_check_unavailable: true } as any, false);
      expect(result).toEqual({ kind: 'stock_check_unavailable' });
    });

    it('treats a missing points array as empty and falls through to unavailable_items', () => {
      const items = [{ product_id: 'p1', title: 'Куртка', slug: 'kurtka' }];
      const result = derivePickupAvailability({ unavailable_items: items } as any, false);
      expect(result).toEqual({ kind: 'hard_blocker', items });
    });

    it('treats a missing unavailable_items array as empty and falls through to no_common_store', () => {
      const result = derivePickupAvailability({ no_common_store: true } as any, false);
      expect(result).toEqual({ kind: 'no_common_store' });
    });
  });
});

describe('isPickupUnavailable', () => {
  it.each([
    ['stock_check_unavailable'],
    ['hard_blocker'],
    ['no_common_store'],
    ['unavailable'],
  ])('is true for the disable-with-reason state %s', (kind) => {
    expect(isPickupUnavailable({ kind } as any)).toBe(true);
  });

  it.each([
    ['idle'],
    ['loading'],
    ['available'],
  ])('is false for %s (store stays selectable)', (kind) => {
    expect(isPickupUnavailable({ kind } as any)).toBe(false);
  });
});
