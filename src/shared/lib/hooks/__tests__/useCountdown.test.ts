import { act, renderHook } from '@testing-library/react';
import { useCountdown } from '../useCountdown';

describe('useCountdown', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-05-28T22:00:00+03:00'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('initial diff equals remaining ms', () => {
    const endsAt = Date.now() + 5000;
    const { result } = renderHook(() => useCountdown(endsAt));

    expect(result.current.diff).toBe(5000);
    expect(result.current.isExpired).toBe(false);
  });

  it('clamps to zero when endsAt is in the past', () => {
    const endsAt = Date.now() - 10_000;
    const { result } = renderHook(() => useCountdown(endsAt));

    expect(result.current.diff).toBe(0);
    expect(result.current.isExpired).toBe(true);
  });

  it('ticks down every second', () => {
    const endsAt = Date.now() + 3000;
    const { result } = renderHook(() => useCountdown(endsAt));

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.diff).toBe(2000);

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.diff).toBe(1000);
  });

  it('reaches zero and stops further ticks once cleared', () => {
    const endsAt = Date.now() + 2000;
    const { result } = renderHook(() => useCountdown(endsAt));

    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(result.current.diff).toBe(0);
    expect(result.current.isExpired).toBe(true);

    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(result.current.diff).toBe(0);
  });

  it('leaves no pending timers after unmount', () => {
    const endsAt = Date.now() + 5000;
    const { unmount } = renderHook(() => useCountdown(endsAt));

    expect(jest.getTimerCount()).toBeGreaterThan(0);

    unmount();

    expect(jest.getTimerCount()).toBe(0);
  });

  it('reacts to a new timestampEnd by recomputing diff', () => {
    const start = Date.now();
    const { result, rerender } = renderHook(
      ({ endsAt }: { endsAt: number }) => useCountdown(endsAt),
      { initialProps: { endsAt: start + 3000 } },
    );
    expect(result.current.diff).toBe(3000);

    rerender({ endsAt: start + 10_000 });
    expect(result.current.diff).toBe(10_000);
    expect(result.current.isExpired).toBe(false);
  });
});
