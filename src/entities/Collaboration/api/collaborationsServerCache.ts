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

/**
 * A miss is remembered too, and this is the whole point of the negative entry: a cache that only
 * stores successes leaves every single SSR page paying the endpoint timeout again while the API is
 * down. Kept short so the menu returns on the first render after recovery.
 *
 * It doubles as the ceiling on how long an in-flight request stays shared (see `resolve`), which
 * only works because it is comfortably above the endpoint timeout in collaborationApi.
 */
export const COLLABORATIONS_FAILURE_TTL_MS = 5_000;

type CacheEntry = {
  /** The request, not its result: concurrent renders join it instead of firing their own. */
  request: Promise<CollaborationsData | null>;
  expiresAt: number;
};

// Keyed by locale: label, title and url are translated, but the endpoint takes no arguments.
const entries = new Map<string, CacheEntry>();

export const collaborationsServerCache = {
  /**
   * Single-flight per locale: returns the stored payload, the request another render already
   * started, or a fresh one. `load` reports a failure as `null` — the caller never sees it throw.
   */
  resolve(
    locale: string,
    load: () => Promise<CollaborationsData | null>,
  ): Promise<CollaborationsData | null> {
    const live = entries.get(locale);
    if (live && live.expiresAt > Date.now()) return live.request;

    const request = load()
      .catch(() => null)
      .then((data) => {
        const entry = entries.get(locale);
        // Only ever rewrite our own slot: clear() or a newer request must not be resurrected.
        if (entry?.request === request) {
          entry.expiresAt = Date.now() + (data ? COLLABORATIONS_CACHE_TTL_MS : COLLABORATIONS_FAILURE_TTL_MS);
        }
        return data;
      });

    // The in-flight slot carries the failure TTL until the outcome is known, so a request that
    // never settles expires instead of holding every later render on a dead promise.
    entries.set(locale, {
      request,
      expiresAt: Date.now() + COLLABORATIONS_FAILURE_TTL_MS,
    });

    return request;
  },

  clear(): void {
    entries.clear();
  },
};
