import { Shop } from '@/entities/Shop';
import { PickupBlockedItem, PickupPointsData } from '../api/types';

export type PickupAvailability =
  | { kind: 'idle' } // not queried yet (no city / store method absent)
  | { kind: 'loading' }
  | { kind: 'available'; points: Shop[] } // state 2
  | { kind: 'stock_check_unavailable' } // state 1 — 1C down, fail-closed
  | { kind: 'hard_blocker'; items: PickupBlockedItem[] } // state 3
  | { kind: 'no_common_store' } // state 4
  // state 5 — default fallback. Verified against StoreRepository::getPickupStoresForCart
  // (backend): the points/hard-blocker/no_common_store intersection is computed
  // NATIONWIDE first; city_id is applied afterwards, in the controller, as a plain
  // filter on the already-finalized `points`. So this state means "a fulfilling
  // store exists somewhere in Ukraine, just not in the selected city" — never
  // ambiguous with the other three states, which are all city-independent by
  // construction. Message copy (pickup.unavailable.no_store_in_city) relies on
  // this being true; re-verify against the backend before changing the wording.
  | { kind: 'unavailable' };

// Precedence is contractual: stock_check_unavailable MUST be checked first — when 1C
// is down the backend leaves the other diagnostic fields empty, and showing an
// unfiltered list would dead-end the checkout.
export const derivePickupAvailability = (
  data: PickupPointsData | undefined,
  isLoading: boolean,
): PickupAvailability => {
  if (isLoading) return { kind: 'loading' };
  if (!data) return { kind: 'idle' };

  // Fail-closed against a malformed 1C-backed payload: default missing arrays to
  // empty (flags read as falsy when absent) so a bad response degrades to the safe
  // `unavailable` state instead of throwing and crashing the checkout render.
  const points = data.points ?? [];
  const unavailableItems = data.unavailable_items ?? [];

  if (data.stock_check_unavailable) return { kind: 'stock_check_unavailable' };
  if (points.length > 0) return { kind: 'available', points };
  if (unavailableItems.length > 0) return { kind: 'hard_blocker', items: unavailableItems };
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
