import { localStorageService } from '@/shared/lib/services/localStorage.service';

// The live cart GUID and the purchase snapshot are deliberately distinct keys: a
// post-order cart clear rotates the cart GUID without corrupting the purchase GUID.
const CART_GUID_KEY = 'esputnik/cartGuid';
const PURCHASE_GUID_KEY = 'esputnik/purchaseGuid';

// crypto.randomUUID is secure-context only (https/localhost); guard window + its presence.
const canGenerateGuid = (): boolean => typeof window !== 'undefined'
  && typeof crypto !== 'undefined'
  && typeof crypto.randomUUID === 'function';

// Generate a fresh cart GUID (UUID v4) and persist it; called on every cart mutation.
export const nextCartGuid = (): string | undefined => {
  if (!canGenerateGuid()) return undefined;

  const guid = crypto.randomUUID();
  localStorageService.set(CART_GUID_KEY, guid);

  return guid;
};

// Read the last generated cart GUID.
export const lastCartGuid = (): string | undefined => localStorageService.get<string>(CART_GUID_KEY);

// Snapshot the current cart GUID into the purchase key at order-submit time so the
// success-page PurchasedItems event binds to the pre-clear basket.
export const snapshotPurchaseGuid = (): string | undefined => {
  const guid = lastCartGuid();
  if (guid) localStorageService.set(PURCHASE_GUID_KEY, guid);

  return guid;
};

// Read the purchase-snapshot GUID for PurchasedItems.
export const readPurchaseGuid = (): string | undefined => localStorageService.get<string>(PURCHASE_GUID_KEY);

// Clear the purchase snapshot after PurchasedItems has fired.
export const clearPurchaseGuid = (): void => localStorageService.remove(PURCHASE_GUID_KEY);
