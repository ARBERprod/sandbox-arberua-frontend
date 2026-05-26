import type { TFunction } from 'next-i18next';

const MS_IN_DAY = 1000 * 60 * 60 * 24;
const MS_IN_HOUR = 1000 * 60 * 60;
const MS_IN_MIN = 1000 * 60;

const formatDays = (value: number, t: TFunction): string => {
  if (value <= 0) return '';
  if (value === 1) return `${value} ${t('day')}`;
  if (value < 5) return `${value} ${t('days')}`;
  return `${value} ${t('days2')}`;
};

const formatHours = (value: number, t: TFunction): string => {
  if (value <= 0) return '';
  if (value === 1) return `${value} ${t('hour')}`;
  if (value < 5) return `${value} ${t('hours')}`;
  return `${value} ${t('hours2')}`;
};

const formatMinutes = (value: number, t: TFunction): string => {
  if (value <= 0) return '';
  if (value === 1) return `${value} ${t('minute')}`;
  if (value < 5) return `${value} ${t('minutes')}`;
  return `${value} ${t('minutes2')}`;
};

export function formatCountdown(diff: number, t: TFunction): string {
  const safe = Math.max(0, diff);
  const days = Math.floor(safe / MS_IN_DAY);
  const hours = Math.floor((safe / MS_IN_HOUR) % 24);
  const minutes = Math.floor((safe / MS_IN_MIN) % 60);
  return `${formatDays(days, t)} ${formatHours(hours, t)} ${formatMinutes(minutes, t)}`;
}
