import { cookieModalManager } from '@/features/CookieModal/lib/CookieModalManager';

// eS.js expects every event param as a string; the frontend holds number/boolean.
// undefined is permitted for optional payload fields — it is dropped before send.
type EsParamValue = string | number | boolean;
export type EsParamObject = Record<string, EsParamValue | undefined>;
export type EsRawParams = Record<string, EsParamValue | undefined | EsParamObject[]>;

// Typed input payload per event (FE-native number/boolean; stringified before send).
// Single source of truth — do NOT re-declare via `declare module` in feature files;
// add new events here. `productKey` is always the parent product id (= feed <g:id>).
export interface EsEventPayloadMap {
  MainPage: undefined;
  NotFound: undefined;
  ProductPage: { productKey: string; price: number; isInStock: boolean };
  CategoryPage: { categoryKey: string };
  AddToWishlist: { productKey: string; price: number };
  StatusCart: {
    items: { productKey: string; price: number; quantity: number }[];
    guid?: string;
  };
  // guid is the order-submit snapshot, not a live cart GUID (see GUID protocol).
  PurchasedItems: {
    items: { productKey: string; price: number; quantity: number }[];
    OrderNumber: number;
    guid?: string;
  };
  // Identifies the authenticated shopper; does NOT create/update a contact
  // (the backend owns that via UpdateEsputnikContactJob). sex omitted when unknown.
  CustomerData: {
    externalCustomerId: string;
    email: string;
    first_name: string;
    phone: string;
    sex?: string;
  };
}

export type EsEventName = keyof EsEventPayloadMap;

type EsEventArgs<E extends EsEventName> =
  EsEventPayloadMap[E] extends undefined ? [] : [payload: EsEventPayloadMap[E]];

const stringifyValue = (value: EsParamValue): string => String(value);

// eS.js requires all params as strings; recurse one level into item arrays (cart/order lines).
// undefined values are skipped so eSputnik never receives the literal string "undefined".
export const stringifyEsParams = (params: EsRawParams): Record<string, unknown> => {
  const result: Record<string, unknown> = {};

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined) return;

    if (Array.isArray(value)) {
      result[key] = value.map((item) => {
        const stringifiedItem: Record<string, string> = {};
        Object.entries(item).forEach(([itemKey, itemValue]) => {
          if (itemValue === undefined) return;
          stringifiedItem[itemKey] = stringifyValue(itemValue);
        });
        return stringifiedItem;
      });
    } else {
      result[key] = stringifyValue(value);
    }
  });

  return result;
};

// eS.js command-queue stub. MUST match the official snippet's queue shape: the outer call
// forwards its args to `.c`, and `.c` pushes ITS OWN args, so each entry is `[callArgs]`
// (nested one level). eS.js drains by locating init via `entry[0][0] === 'init'` and replaying
// `entry[0]` — a flat `[callArgs]` breaks detection and nothing sends.
type EsQueueStub = ((...args: unknown[]) => void) & { q: unknown[]; c: (...args: unknown[]) => void };

// The eS.js loader (ExternalScripts) is consent-gated and mounts *after* React mount effects,
// so a landing page's mount event would fire while window.eS is undefined and be dropped.
// Install the queue stub on demand so those events buffer until eS.js drains them; `init` is
// enqueued first so eS.js initializes before it replays any sendEvent. Idempotent; caller gates
// on consent + flag (never enqueue before consent).
export function ensureEsQueue(): void {
  if (typeof window === 'undefined') return;
  if (typeof window.eS === 'function') return;

  const stub = ((...args: unknown[]) => { stub.c(args); }) as EsQueueStub;
  stub.q = [];
  stub.c = (...args: unknown[]) => { stub.q.push(args); };
  window.eS = stub;
  window.eS('init');
}

// Fire-and-forget eSputnik web-tracking event. Guards in order: SSR → kill-switch flag →
// consent; then ensureEsQueue() guarantees window.eS (buffered until eS.js loads). Never
// throws into the render path.
export function sendEsEvent<E extends EsEventName>(name: E, ...args: EsEventArgs<E>): void {
  try {
    if (typeof window === 'undefined') return;
    if (process.env.NEXT_PUBLIC_ESPUTNIK_TRACKING_ENABLED !== 'true') return;
    if (!cookieModalManager.isCookiesAccepted()) return;

    ensureEsQueue();
    const { eS } = window;
    if (typeof eS !== 'function') return;

    const payload = args[0] as EsRawParams | undefined;
    if (payload === undefined) {
      eS('sendEvent', name);
      return;
    }

    eS('sendEvent', name, stringifyEsParams(payload));
  } catch {
    // analytics is fire-and-forget; never throw into the render path
  }
}
