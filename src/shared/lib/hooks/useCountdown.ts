import { useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';

const formatTime = (
  value: number,
  singularKey: string,
  fewKey: string,
  manyKey: string,
  t: any,
): string => {
  if (value <= 0) return '';

  if (value === 1) {
    return `${value} ${t(singularKey)}`;
  } if (value < 5) {
    return `${value} ${t(fewKey)}`;
  }
  return `${value} ${t(manyKey)}`;
};

export const useCountdown = (timestampEnd: number) => {
  const [end] = useState(timestampEnd);
  const { t } = useTranslation();
  const getDifference = () => {
    const diff = end - Date.now();
    if (diff < 0) return 0;
    return diff;
  };

  const getFormattedDate = (diff: number) => {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const daysText = formatTime(days, 'day', 'days', 'days2', t);
    const hoursText = formatTime(hours, 'hour', 'hours', 'hours2', t);
    const minutesText = formatTime(minutes, 'minute', 'minutes', 'minutes2', t);
    return `${daysText || ''} ${hoursText} ${minutesText}`;
  };

  const [formattedDate, setFormattedDate] = useState(getFormattedDate(getDifference()));
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const tick = () => {
    const difference = getDifference();
    if (difference === 0 && timerRef.current) {
      clearInterval(timerRef.current);
      setFormattedDate('00:00:00');
      return;
    }
    setFormattedDate(getFormattedDate(difference));
  };

  useLayoutEffect(() => {
    timerRef.current = setInterval(tick, 1000);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  });

  return { formattedDate };
};
