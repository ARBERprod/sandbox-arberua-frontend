import type { CollaborationsData } from '../types';
import { COLLABORATIONS_CACHE_TTL_MS, collaborationsServerCache } from '../collaborationsServerCache';

const dataFor = (label: string): CollaborationsData => ({
  collaborations: [{
    id: 'c-1',
    title: 'Partner',
    label,
    url: '/collaboration/c-1',
    logo: null,
  }],
});

describe('collaborationsServerCache', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    collaborationsServerCache.clear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('misses when nothing was stored for the locale', () => {
    expect(collaborationsServerCache.get('uk')).toBeNull();
  });

  it('hits with the stored payload inside the TTL', () => {
    const data = dataFor('ARBER × Partner');
    collaborationsServerCache.set('uk', data);

    jest.advanceTimersByTime(COLLABORATIONS_CACHE_TTL_MS - 1);

    expect(collaborationsServerCache.get('uk')).toEqual(data);
  });

  it('misses once the TTL has passed', () => {
    collaborationsServerCache.set('uk', dataFor('ARBER × Partner'));

    jest.advanceTimersByTime(COLLABORATIONS_CACHE_TTL_MS);

    expect(collaborationsServerCache.get('uk')).toBeNull();
  });

  // label, title and url are translated while the endpoint takes no arguments: a single shared
  // slot would serve Ukrainian menu items on /ru and /en.
  it('keeps locales apart', () => {
    const uk = dataFor('ARBER × Партнер');
    const ru = dataFor('ARBER × Партнёр');

    collaborationsServerCache.set('uk', uk);
    expect(collaborationsServerCache.get('ru')).toBeNull();

    collaborationsServerCache.set('ru', ru);
    expect(collaborationsServerCache.get('uk')).toEqual(uk);
    expect(collaborationsServerCache.get('ru')).toEqual(ru);
  });

  it('overwrites the slot of the same locale', () => {
    collaborationsServerCache.set('uk', dataFor('old'));
    collaborationsServerCache.set('uk', dataFor('new'));

    expect(collaborationsServerCache.get('uk')?.collaborations[0].label).toBe('new');
  });

  it('drops everything on clear', () => {
    collaborationsServerCache.set('uk', dataFor('ARBER × Partner'));
    collaborationsServerCache.clear();

    expect(collaborationsServerCache.get('uk')).toBeNull();
  });
});
