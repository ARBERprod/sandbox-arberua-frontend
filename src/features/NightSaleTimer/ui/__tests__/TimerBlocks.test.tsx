import { act, render, screen } from '@testing-library/react';
// Use the Node entry-point to avoid the browser bundle requiring TextEncoder in jsdom.
import { renderToString } from 'react-dom/server.node';
import { TimerBlocks } from '../TimerBlocks';

describe('TimerBlocks', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-05-28T22:00:00+03:00'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the label and 6 empty placeholder blocks on the server (no mount-effect)', () => {
    const endsAt = Date.now() + 5_000;
    const html = renderToString(
      <TimerBlocks label="Нічний розпродаж" endsAt={endsAt} onExpire={jest.fn()} />,
    );

    expect(html).toContain('Нічний розпродаж');

    const container = document.createElement('div');
    container.innerHTML = html;
    const blocks = container.querySelectorAll('div[class*="block"]');
    expect(blocks).toHaveLength(6);
    blocks.forEach((block) => {
      expect(block.textContent).toBe('');
    });
  });

  it('mounts and renders label without throwing in the client', () => {
    const endsAt = Date.now() + 5_000;
    render(<TimerBlocks label="Нічний розпродаж" endsAt={endsAt} onExpire={jest.fn()} />);

    expect(screen.getByText('Нічний розпродаж')).toBeInTheDocument();
  });

  it('fills digits after mount', () => {
    const endsAt = Date.now() + (12 * 3600 + 34 * 60 + 56) * 1000;
    const { container } = render(
      <TimerBlocks label="x" endsAt={endsAt} onExpire={jest.fn()} />,
    );

    act(() => {
      jest.advanceTimersByTime(0);
    });

    const blocks = container.querySelectorAll('div[class*="block"]');
    const digits = Array.from(blocks).map((b) => b.textContent);
    expect(digits).toEqual(['1', '2', '3', '4', '5', '6']);
  });

  it('renders all hour digits when total hours exceed 99 (no truncation)', () => {
    const endsAt = Date.now() + (478 * 3600 + 46 * 60 + 0) * 1000;
    const { container } = render(
      <TimerBlocks label="x" endsAt={endsAt} onExpire={jest.fn()} />,
    );

    act(() => {
      jest.advanceTimersByTime(0);
    });

    const blocks = container.querySelectorAll('div[class*="block"]');
    const digits = Array.from(blocks).map((b) => b.textContent);
    expect(digits).toEqual(['4', '7', '8', '4', '6', '0', '0']);
  });

  it('calls onExpire exactly once when the timer ticks down to zero', () => {
    const onExpire = jest.fn();
    const endsAt = Date.now() + 2_000;
    render(<TimerBlocks label="x" endsAt={endsAt} onExpire={onExpire} />);

    act(() => {
      jest.advanceTimersByTime(0);
    });
    expect(onExpire).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(2_000);
    });
    expect(onExpire).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(5_000);
    });
    expect(onExpire).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onExpire if the timer was already expired at mount', () => {
    const onExpire = jest.fn();
    const endsAt = Date.now() - 10_000;
    render(<TimerBlocks label="x" endsAt={endsAt} onExpire={onExpire} />);

    act(() => {
      jest.advanceTimersByTime(5_000);
    });
    expect(onExpire).not.toHaveBeenCalled();
  });
});
