import type { CollaborationsData } from '../types';
import {
  COLLABORATIONS_CACHE_TTL_MS,
  COLLABORATIONS_FAILURE_TTL_MS,
  collaborationsServerCache,
} from '../collaborationsServerCache';

const dataFor = (label: string): CollaborationsData => ({
  collaborations: [{
    id: 'c-1',
    title: 'Partner',
    label,
    url: '/collaboration/c-1',
    logo: null,
  }],
});

const loaderOf = (data: CollaborationsData | null) => jest.fn(async () => data);

describe('collaborationsServerCache', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    collaborationsServerCache.clear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('asks the loader on a cold slot and hands its payload back', async () => {
    const data = dataFor('ARBER × Partner');
    const load = loaderOf(data);

    await expect(collaborationsServerCache.resolve('uk', load)).resolves.toEqual(data);
    expect(load).toHaveBeenCalledTimes(1);
  });

  it('serves the stored payload without touching the loader inside the TTL', async () => {
    const data = dataFor('ARBER × Partner');
    const load = loaderOf(data);

    await collaborationsServerCache.resolve('uk', load);
    jest.advanceTimersByTime(COLLABORATIONS_CACHE_TTL_MS - 1);

    await expect(collaborationsServerCache.resolve('uk', load)).resolves.toEqual(data);
    expect(load).toHaveBeenCalledTimes(1);
  });

  it('asks the loader again once the TTL has passed', async () => {
    const load = loaderOf(dataFor('ARBER × Partner'));

    await collaborationsServerCache.resolve('uk', load);
    jest.advanceTimersByTime(COLLABORATIONS_CACHE_TTL_MS);
    await collaborationsServerCache.resolve('uk', load);

    expect(load).toHaveBeenCalledTimes(2);
  });

  // label, title and url are translated while the endpoint takes no arguments: a single shared
  // slot would serve Ukrainian menu items on /ru and /en.
  it('keeps locales apart', async () => {
    const uk = dataFor('ARBER × Партнер');
    const ru = dataFor('ARBER × Партнёр');

    await collaborationsServerCache.resolve('uk', loaderOf(uk));

    await expect(collaborationsServerCache.resolve('ru', loaderOf(ru))).resolves.toEqual(ru);
    await expect(collaborationsServerCache.resolve('uk', loaderOf(null))).resolves.toEqual(uk);
  });

  it('drops everything on clear', async () => {
    const load = loaderOf(dataFor('ARBER × Partner'));

    await collaborationsServerCache.resolve('uk', load);
    collaborationsServerCache.clear();
    await collaborationsServerCache.resolve('uk', load);

    expect(load).toHaveBeenCalledTimes(2);
  });

  describe('failures', () => {
    // Without a negative entry every SSR render pays the endpoint timeout again while the API is
    // down — the cache would protect the happy path only.
    it('remembers a miss for the short TTL instead of retrying on every render', async () => {
      const load = loaderOf(null);

      await expect(collaborationsServerCache.resolve('uk', load)).resolves.toBeNull();
      jest.advanceTimersByTime(COLLABORATIONS_FAILURE_TTL_MS - 1);

      await expect(collaborationsServerCache.resolve('uk', load)).resolves.toBeNull();
      expect(load).toHaveBeenCalledTimes(1);
    });

    it('retries once the short TTL has passed', async () => {
      const load = loaderOf(null);

      await collaborationsServerCache.resolve('uk', load);
      jest.advanceTimersByTime(COLLABORATIONS_FAILURE_TTL_MS);
      await collaborationsServerCache.resolve('uk', load);

      expect(load).toHaveBeenCalledTimes(2);
    });

    it('keeps a payload well past the failure window', async () => {
      const data = dataFor('ARBER × Partner');
      const load = loaderOf(data);

      await collaborationsServerCache.resolve('uk', load);
      jest.advanceTimersByTime(COLLABORATIONS_FAILURE_TTL_MS);

      await expect(collaborationsServerCache.resolve('uk', load)).resolves.toEqual(data);
      expect(load).toHaveBeenCalledTimes(1);
    });

    // A throwing loader must not reach getInitialProps: the menu is decoration, the page is not.
    it('swallows a rejected loader and remembers the miss', async () => {
      const load = jest.fn(async () => {
        throw new Error('network down');
      });

      await expect(collaborationsServerCache.resolve('uk', load)).resolves.toBeNull();
      await expect(collaborationsServerCache.resolve('uk', load)).resolves.toBeNull();
      expect(load).toHaveBeenCalledTimes(1);
    });
  });

  describe('concurrent renders', () => {
    // Every request builds its own store, so RTK Query cannot deduplicate across renders: the
    // shared promise is what keeps a cold cache from firing N identical requests.
    it('shares one in-flight request between renders', async () => {
      const data = dataFor('ARBER × Partner');
      let settle: (value: CollaborationsData | null) => void = () => {};
      const load = jest.fn(() => new Promise<CollaborationsData | null>((resolve) => {
        settle = resolve;
      }));

      const first = collaborationsServerCache.resolve('uk', load);
      const second = collaborationsServerCache.resolve('uk', load);
      settle(data);

      await expect(first).resolves.toEqual(data);
      await expect(second).resolves.toEqual(data);
      expect(load).toHaveBeenCalledTimes(1);
    });

    // The in-flight slot expires on its own, otherwise a promise that never settles would hold
    // every later render forever — a worse failure than the duplicate request it prevents.
    it('starts a new request when the previous one outlives the in-flight window', () => {
      const load = jest.fn(() => new Promise<CollaborationsData | null>(() => {}));

      collaborationsServerCache.resolve('uk', load);
      jest.advanceTimersByTime(COLLABORATIONS_FAILURE_TTL_MS);
      collaborationsServerCache.resolve('uk', load);

      expect(load).toHaveBeenCalledTimes(2);
    });
  });
});
