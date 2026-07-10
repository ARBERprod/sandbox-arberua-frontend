import { Shop } from '@/entities/Shop';
import { PickupBlockedItem, PickupPointsData } from '../api/types';

export type PickupAvailability =
  | { kind: 'idle' } // not queried yet (no city / store method absent)
  | { kind: 'loading' }
  | { kind: 'available'; points: Shop[] } // state 2
  | { kind: 'stock_check_unavailable' } // state 1 — 1C down, fail-closed
  | { kind: 'hard_blocker'; items: PickupBlockedItem[] } // state 3
  | { kind: 'no_common_store' } // state 4
  | { kind: 'unavailable' }; // state 5 — default fallback

// Precedence is contractual (design contract, Step 3.3): stock_check_unavailable
// MUST be checked first — when 1C is down the backend leaves the other diagnostic
// fields empty, and showing an unfiltered list would dead-end the checkout.
export const derivePickupAvailability = (
  data: PickupPointsData | undefined,
  isLoading: boolean,
): PickupAvailability => {
  if (isLoading) return { kind: 'loading' };
  if (!data) return { kind: 'idle' };

  if (data.stock_check_unavailable) return { kind: 'stock_check_unavailable' };
  if (data.points.length > 0) return { kind: 'available', points: data.points };
  if (data.unavailable_items.length > 0) return { kind: 'hard_blocker', items: data.unavailable_items };
  if (data.no_common_store) return { kind: 'no_common_store' };
  return { kind: 'unavailable' };
};

// The store delivery method is shown-but-disabled-with-reason in these states
// (1/3/4/5). `loading`/`idle`/`available` keep it selectable.
export const isPickupUnavailable = (availability: PickupAvailability): boolean => (
  availability.kind === 'stock_check_unavailable'
  || availability.kind === 'hard_blocker'
  || availability.kind === 'no_common_store'
  || availability.kind === 'unavailable'
);
