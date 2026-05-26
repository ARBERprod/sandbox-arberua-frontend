import { act, render } from '@testing-library/react';
import type { PromotionsItem } from '@/entities/Promotion';
import { NightSaleTimer } from '../NightSaleTimer';

const mockReplace = jest.fn();
let mockShare: PromotionsItem | null = null;

jest.mock('next/router', () => ({
  useRouter: () => ({
    replace: mockReplace,
    asPath: '/ru/product/test-slug',
  }),
}));

jest.mock('../../model/useActivePdpShare', () => ({
  useActivePdpShare: () => ({ share: mockShare, isLoading: false }),
}));

const makeShare = (overrides: Partial<PromotionsItem> = {}): PromotionsItem => ({
  title: 'Нічний розпродаж',
  start_date: '2026-05-28T22:00:00+03:00',
  end_date: '2026-05-29T10:00:00+03:00',
  is_started: true,
  picture: 'p.jpg',
  has_seconds_until_end: 36000,
  show_pdp_timer: true,
  ...overrides,
});

describe('NightSaleTimer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-05-28T23:00:00+03:00'));
    mockReplace.mockReset();
    mockShare = null;
    (window as Window & typeof globalThis).dataLayer = [];
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders null when there is no active share', () => {
    const { container } = render(<NightSaleTimer />);
    expect(container.firstChild).toBeNull();
  });

  it('pushes night_sale_timer_shown on mount when active', () => {
    mockShare = makeShare({ title: 'Нічний розпродаж' });
    render(<NightSaleTimer />);
    act(() => {
      jest.advanceTimersByTime(0);
    });

    expect(window.dataLayer).toContainEqual({
      event: 'night_sale_timer_shown',
      timer_label: 'Нічний розпродаж',
    });
  });

  it('calls router.replace and pushes expired event when the timer expires', () => {
    mockShare = makeShare({ end_date: new Date(Date.now() + 2_000).toISOString() });
    render(<NightSaleTimer />);

    act(() => {
      jest.advanceTimersByTime(2_000);
    });

    expect(mockReplace).toHaveBeenCalledWith('/ru/product/test-slug', undefined, { scroll: false });
    expect(window.dataLayer).toContainEqual({
      event: 'night_sale_timer_expired',
      timer_label: mockShare!.title,
    });
  });

  it('does not call router.replace when unmounted before the deadline', () => {
    mockShare = makeShare({ end_date: new Date(Date.now() + 5_000).toISOString() });
    const { unmount } = render(<NightSaleTimer />);

    unmount();

    act(() => {
      jest.advanceTimersByTime(10_000);
    });

    expect(mockReplace).not.toHaveBeenCalled();
  });
});
