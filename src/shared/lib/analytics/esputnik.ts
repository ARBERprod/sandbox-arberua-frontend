import { cookieModalManager } from '@/features/CookieModal/lib/CookieModalManager';

// eS.js expects every event param as a string; the frontend holds number/boolean.
type EsParamValue = string | number | boolean;
export type EsParamObject = Record<string, EsParamValue>;
export type EsRawParams = Record<string, EsParamValue | EsParamObject[]>;

// Typed input payload per event (FE-native number/boolean; stringified before send).
export interface EsEventPayloadMap {
  MainPage: undefined;
  NotFound: undefined;
  ProductPage: { productKey: string; price: number; isInStock: boolean };
  CategoryPage: { categoryKey: string };
}

export type EsEventName = keyof EsEventPayloadMap;

type EsEventArgs<E extends EsEventName> =
  EsEventPayloadMap[E] extends undefined ? [] : [payload: EsEventPayloadMap[E]];

const stringifyValue = (value: EsParamValue): string => String(value);

// eS.js requires all params as strings; recurse one level into item arrays (cart/order lines).
export const stringifyEsParams = (params: EsRawParams): Record<string, unknown> => {
  const result: Record<string, unknown> = {};

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      result[key] = value.map((item) => {
        const stringifiedItem: Record<string, string> = {};
        Object.entries(item).forEach(([itemKey, itemValue]) => {
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

// Fire-and-forget eSputnik web-tracking event. Guards in order: SSR → eS presence →
// consent → kill-switch flag. Never throws into the render path.
export function sendEsEvent<E extends EsEventName>(name: E, ...args: EsEventArgs<E>): void {
  try {
    if (typeof window === 'undefined') return;
    if (typeof window.eS !== 'function') return;
    if (!cookieModalManager.isCookiesAccepted()) return;
    if (process.env.NEXT_PUBLIC_ESPUTNIK_TRACKING_ENABLED !== 'true') return;

    const payload = args[0] as EsRawParams | undefined;
    if (payload === undefined) {
      window.eS('sendEvent', name);
      return;
    }

    window.eS('sendEvent', name, stringifyEsParams(payload));
  } catch {
    // analytics is fire-and-forget; never throw into the render path
  }
}
