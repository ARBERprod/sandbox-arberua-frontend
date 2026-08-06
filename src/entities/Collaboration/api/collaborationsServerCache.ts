import type { CollaborationsData } from './types';

/**
 * In-process cache for the menu request, which Step 3.2 puts on the TTFB path of every SSR page.
 * RTK Query cannot do this job here: next-redux-wrapper builds a fresh store per request, and the
 * Pages Router has no SSR layer that would honour Cache-Control. Lives in the Next process, so
 * under PM2 cluster mode there is one copy per worker.
 *
 * 60 seconds is the upper bound on how late a new collaboration shows up in the menu — sections
 * are created long before they are announced.
 */
export const COLLABORATIONS_CACHE_TTL_MS = 60_000;

type CacheEntry = {
  data: CollaborationsData;
  expiresAt: number;
};

// Keyed by locale: label, title and url are translated, but the endpoint takes no arguments.
const entries = new Map<string, CacheEntry>();

export const collaborationsServerCache = {
  get(locale: string): CollaborationsData | null {
    const entry = entries.get(locale);
    if (!entry) return null;

    if (entry.expiresAt <= Date.now()) {
      entries.delete(locale);
      return null;
    }

    return entry.data;
  },

  set(locale: string, data: CollaborationsData): void {
    entries.set(locale, {
      data,
      expiresAt: Date.now() + COLLABORATIONS_CACHE_TTL_MS,
    });
  },

  clear(): void {
    entries.clear();
  },
};
