import { useEffect, useRef, useState } from 'react';

const getDiff = (timestampEnd: number): number => Math.max(0, timestampEnd - Date.now());

export const useCountdown = (timestampEnd: number) => {
  const [diff, setDiff] = useState(() => getDiff(timestampEnd));
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setDiff(getDiff(timestampEnd));
    timerRef.current = setInterval(() => {
      const next = getDiff(timestampEnd);
      setDiff(next);
      if (next === 0 && timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [timestampEnd]);

  return { diff, isExpired: diff <= 0 };
};
