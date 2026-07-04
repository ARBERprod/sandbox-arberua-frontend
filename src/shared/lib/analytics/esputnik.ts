import { cookieModalManager } from '@/features/CookieModal/lib/CookieModalManager';

// Typed input payload per event (FE-native number/boolean). Single source of truth —
// do NOT re-declare via `declare module` in feature files; add new events here.
// `productKey` is always the parent product id (= feed <g:id>).
export interface EsEventPayloadMap {
  MainPage: undefined;
  NotFound: undefined;
  // SPA page view. Parameterless at the call site (`sendEsEvent('PageView')`); the wire wraps it
  // as `{ PageView: {} }`. eS.js auto-pageview only covers hard reloads, so this fills SPA nav.
  PageView: undefined;
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
  // Links a web session to a contact; does NOT create/update it (the backend owns that via
  // UpdateEsputnikContactJob). eSputnik matches by externalCustomerId, falling back to
  // email/phone — so a guest (no user_id) omits externalCustomerId and matches by email/phone.
  // Empty identifiers/city/sex are dropped by the wire layer.
  CustomerData: {
    externalCustomerId?: string; // absent for guests
    email?: string; // a guest may not provide one
    first_name: string;
    phone: string;
    city?: string; // → user_city
    sex?: string;
  };
}

export type EsEventName = keyof EsEventPayloadMap;

type EsEventArgs<E extends EsEventName> =
  EsEventPayloadMap[E] extends undefined ? [] : [payload: EsEventPayloadMap[E]];

// arber.ua is a single-currency store; eSputnik line items carry the ISO currency.
const ES_CURRENCY = 'UAH';

type EsWirePayload = Record<string, unknown>;
type EsCartLine = { productKey: string; price: number; quantity: number };

// eSputnik line item for cart/order events — price/quantity as strings, currency attached.
const toWireLine = (item: EsCartLine) => ({
  productKey: item.productKey,
  price: String(item.price),
  quantity: String(item.quantity),
  currency: ES_CURRENCY,
});

// Map the FE-native payload to eSputnik's documented wire shape: event data nested under
// the event-name key, price/quantity as strings, isInStock as 0/1, GUID/OrderNumber as
// siblings. Returns undefined for parameterless events (MainPage/NotFound).
// Schema: https://docs.esputnik.com/docs/setting-up-web-tracking-by-sending-events-via-javascript-requests
export function buildEsWirePayload(name: EsEventName, payload: unknown): EsWirePayload | undefined {
  switch (name) {
  case 'PageView':
    // Parameterless event, but eSputnik still expects the wrapped empty object (wire ≠ undefined).
    return { PageView: {} };
  case 'ProductPage': {
    const p = payload as EsEventPayloadMap['ProductPage'];
    return { ProductPage: { productKey: p.productKey, price: String(p.price), isInStock: p.isInStock ? 1 : 0 } };
  }
  case 'CategoryPage': {
    const p = payload as EsEventPayloadMap['CategoryPage'];
    return { CategoryPage: { categoryKey: p.categoryKey } };
  }
  case 'AddToWishlist': {
    const p = payload as EsEventPayloadMap['AddToWishlist'];
    return { AddToWishlist: { productKey: p.productKey, price: String(p.price) } };
  }
  case 'StatusCart': {
    const p = payload as EsEventPayloadMap['StatusCart'];
    return {
      StatusCart: p.items.map(toWireLine),
      ...(p.guid !== undefined ? { GUID: p.guid } : {}),
    };
  }
  case 'PurchasedItems': {
    const p = payload as EsEventPayloadMap['PurchasedItems'];
    // The doc example omits GUID, but the GUID protocol reuses the last StatusCart GUID to
    // attribute the purchase to the cart sequence — keep it as a sibling when present.
    return {
      OrderNumber: String(p.OrderNumber),
      PurchasedItems: p.items.map(toWireLine),
      ...(p.guid !== undefined ? { GUID: p.guid } : {}),
    };
  }
  case 'CustomerData': {
    const p = payload as EsEventPayloadMap['CustomerData'];
    return {
      CustomerData: {
        ...(p.externalCustomerId ? { externalCustomerId: p.externalCustomerId } : {}),
        ...(p.email ? { user_email: p.email } : {}),
        user_name: p.first_name,
        user_phone: p.phone,
        ...(p.city ? { user_city: p.city } : {}),
        ...(p.sex !== undefined ? { user_tags_gender: p.sex } : {}),
      },
    };
  }
  default:
    return undefined;
  }
}

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
// consent; then ensureEsQueue() guarantees window.eS (buffered until eS.js loads). Payload is
// mapped to the documented wire shape. Never throws into the render path.
export function sendEsEvent<E extends EsEventName>(name: E, ...args: EsEventArgs<E>): void {
  try {
    if (typeof window === 'undefined') return;
    if (process.env.NEXT_PUBLIC_ESPUTNIK_TRACKING_ENABLED !== 'true') return;
    if (!cookieModalManager.isCookiesAccepted()) return;

    ensureEsQueue();
    const { eS } = window;
    if (typeof eS !== 'function') return;

    const wire = buildEsWirePayload(name, args[0]);
    if (wire === undefined) {
      eS('sendEvent', name);
      return;
    }

    eS('sendEvent', name, wire);
  } catch {
    // analytics is fire-and-forget; never throw into the render path
  }
}
