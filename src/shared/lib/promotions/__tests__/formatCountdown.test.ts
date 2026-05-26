import type { TFunction } from 'next-i18next';
import { formatCountdown } from '../formatCountdown';

const dict: Record<string, string> = {
  day: 'день',
  days: 'дні',
  days2: 'днів',
  hour: 'година',
  hours: 'години',
  hours2: 'годин',
  minute: 'хвилина',
  minutes: 'хвилини',
  minutes2: 'хвилин',
};

const t = ((key: string) => dict[key] ?? key) as unknown as TFunction;

const MIN = 60_000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

describe('formatCountdown', () => {
  it('returns empty units when diff is zero or negative', () => {
    expect(formatCountdown(0, t)).toBe('  ');
    expect(formatCountdown(-1000, t)).toBe('  ');
  });

  it('formats minutes only (1 → singular, 2-4 → few, 5+ → many)', () => {
    expect(formatCountdown(1 * MIN, t)).toBe('  1 хвилина');
    expect(formatCountdown(3 * MIN, t)).toBe('  3 хвилини');
    expect(formatCountdown(7 * MIN, t)).toBe('  7 хвилин');
  });

  it('formats hours + minutes', () => {
    expect(formatCountdown(2 * HOUR + 15 * MIN, t)).toBe(' 2 години 15 хвилин');
  });

  it('formats days + hours + minutes', () => {
    expect(formatCountdown(5 * DAY + 3 * HOUR + 10 * MIN, t)).toBe('5 днів 3 години 10 хвилин');
  });

  it('uses singular forms for value=1', () => {
    expect(formatCountdown(1 * DAY + 1 * HOUR + 1 * MIN, t)).toBe('1 день 1 година 1 хвилина');
  });

  it('drops zero-valued units', () => {
    expect(formatCountdown(2 * HOUR, t)).toBe(' 2 години ');
    expect(formatCountdown(1 * DAY, t)).toBe('1 день  ');
  });
});
