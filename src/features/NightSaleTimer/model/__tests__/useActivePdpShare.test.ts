import { act, renderHook } from '@testing-library/react';
import type { PromotionsItem } from '@/entities/Promotion';
import { useActivePdpShare } from '../useActivePdpShare';

type QueryResult = {
  data: { data: PromotionsItem[]; meta: Record<string, unknown> } | undefined;
  isLoading: boolean;
  refetch: jest.Mock;
};

const mockRefetch = jest.fn();
const mockUseGetPromotionsQuery = jest.fn<QueryResult, [arg: unknown, options?: Record<string, unknown>]>(() => ({
  data: undefined,
  isLoading: false,
  refetch: mockRefetch,
}));

jest.mock('@/entities/Promotion', () => ({
  useGetPromotionsQuery: (arg: unknown, options?: Record<string, unknown>) => mockUseGetPromotionsQuery(arg, options),
}));

const makeShare = (overrides: Partial<PromotionsItem> = {}): PromotionsItem => ({
  title: 'share',
  start_date: '2026-05-28T22:00:00+03:00',
  end_date: '2026-05-29T10:00:00+03:00',
  is_started: true,
  picture: 'p.jpg',
  has_seconds_until_end: 36000,
  show_pdp_timer: true,
  ...overrides,
});

const setQuery = (shares: PromotionsItem[] | undefined) => {
  mockUseGetPromotionsQuery.mockImplementation(() => ({
    data: shares ? { data: shares, meta: {} } : undefined,
    isLoading: false,
    refetch: mockRefetch,
  }));
};

describe('useActivePdpShare', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-05-28T23:00:00+03:00'));
    mockRefetch.mockReset();
    mockUseGetPromotionsQuery.mockReset();
    setQuery(undefined);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns null when no shares', () => {
    setQuery(undefined);
    const { result } = renderHook(() => useActivePdpShare());
    expect(result.current.share).toBeNull();
  });

  it('returns the active share', () => {
    setQuery([makeShare({ title: 'night' })]);
    const { result } = renderHook(() => useActivePdpShare());
    expect(result.current.share?.title).toBe('night');
  });

  it('refetches when the nearest end boundary is crossed', () => {
    const endIn5min = new Date(Date.now() + 5 * 60 * 1000).toISOString();
    setQuery([makeShare({ end_date: endIn5min })]);
    renderHook(() => useActivePdpShare());

    expect(mockRefetch).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(5 * 60 * 1000);
    });

    expect(mockRefetch).toHaveBeenCalledTimes(1);
  });

  it('drops the share from selection once it expires (tick-driven)', () => {
    const endIn30s = new Date(Date.now() + 30_000).toISOString();
    setQuery([makeShare({ end_date: endIn30s })]);
    const { result } = renderHook(() => useActivePdpShare());

    expect(result.current.share).not.toBeNull();

    act(() => {
      jest.advanceTimersByTime(60_000);
    });

    expect(result.current.share).toBeNull();
  });

  it('subscribes to RTK Query with refetchOnFocus so a throttled tab resyncs on return', () => {
    setQuery([makeShare()]);
    renderHook(() => useActivePdpShare());

    expect(mockUseGetPromotionsQuery).toHaveBeenCalled();
    const options = mockUseGetPromotionsQuery.mock.calls[0][1];
    expect(options).toEqual(expect.objectContaining({
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }));
  });

  it('recovers selection after a long background pause that overshoots the boundary', () => {
    const endIn5min = new Date(Date.now() + 5 * 60 * 1000).toISOString();
    setQuery([makeShare({ end_date: endIn5min })]);
    const { result } = renderHook(() => useActivePdpShare());

    expect(result.current.share).not.toBeNull();

    act(() => {
      jest.advanceTimersByTime(15 * 60 * 1000);
    });

    expect(mockRefetch).toHaveBeenCalled();
    expect(result.current.share).toBeNull();
  });
});
