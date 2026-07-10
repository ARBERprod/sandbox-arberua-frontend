// Single source of truth for pickup business-error codes the backend returns on
// order submit (design contract Decision 5 / backend Step 2.5). Every branch on
// a pickup code must import from this module — mirrors promocodeCodes.ts.

export const PICKUP_CHECKOUT_CODES = [
  // Selected point lost stock between checkout render and submit — recoverable:
  // re-pick a point.
  'pickup_stock_changed',
  // 1C down at submit, order blocked — transient, keep the selection and retry.
  'pickup_stock_unavailable',
] as const;

export type PickupCheckoutCode = typeof PICKUP_CHECKOUT_CODES[number];

const PICKUP_SET: ReadonlySet<string> = new Set(PICKUP_CHECKOUT_CODES);

export const isPickupCheckoutCode = (code: string): code is PickupCheckoutCode => (
  PICKUP_SET.has(code)
);

export const isPickupStockChangedCode = (
  code: string,
): code is 'pickup_stock_changed' => code === 'pickup_stock_changed';
