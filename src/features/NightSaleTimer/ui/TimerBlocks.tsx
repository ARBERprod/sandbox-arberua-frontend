import {
  memo, useEffect, useRef, useState,
} from 'react';
import { useCountdown } from '@/shared/lib/hooks/useCountdown';
import styles from './TimerBlocks.module.scss';

interface TimerBlocksProps {
  label: string;
  endsAt: number;
  onExpire: () => void;
}

const PLACEHOLDER_BLOCK_COUNT = 2;

const splitHHMMSS = (diff: number): [string[], string[], string[]] => {
  const totalSec = Math.max(0, Math.floor(diff / 1000));
  const hours = Math.floor(totalSec / 3600);
  const minutes = Math.floor((totalSec / 60) % 60);
  const seconds = totalSec % 60;
  return [
    String(hours).padStart(2, '0').split(''),
    String(minutes).padStart(2, '0').split(''),
    String(seconds).padStart(2, '0').split(''),
  ];
};

interface DigitGroupProps {
  prefix: string;
  digits: string[];
}

const DigitGroup = ({ prefix, digits }: DigitGroupProps) => (
  <>
    {digits.map((digit, idx) => (
      // eslint-disable-next-line react/no-array-index-key
      <div key={`${prefix}-${idx}`} className={styles.block}>{digit}</div>
    ))}
  </>
);

interface PlaceholderGroupProps {
  prefix: string;
}

const PlaceholderGroup = ({ prefix }: PlaceholderGroupProps) => (
  <>
    {Array.from({ length: PLACEHOLDER_BLOCK_COUNT }, (_, idx) => (
      // eslint-disable-next-line react/no-array-index-key
      <div key={`${prefix}-placeholder-${idx}`} className={styles.block} />
    ))}
  </>
);

export const TimerBlocks = memo(({ label, endsAt, onExpire }: TimerBlocksProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const { diff, isExpired } = useCountdown(endsAt);
  const expiredAtMountRef = useRef<boolean | null>(null);
  const calledRef = useRef(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (expiredAtMountRef.current === null) {
      expiredAtMountRef.current = isExpired;
    }
    if (!calledRef.current && isExpired && !expiredAtMountRef.current) {
      calledRef.current = true;
      onExpire();
    }
  }, [isExpired, onExpire]);

  const [hDigits, mDigits, sDigits] = splitHHMMSS(diff);

  return (
    <div className={styles.timer}>
      <span className={styles.label}>{label}</span>
      <div className={styles.digits}>
        {isMounted ? <DigitGroup prefix="h" digits={hDigits} /> : <PlaceholderGroup prefix="h" />}
        <span className={styles.colon}>:</span>
        {isMounted ? <DigitGroup prefix="m" digits={mDigits} /> : <PlaceholderGroup prefix="m" />}
        <span className={styles.colon}>:</span>
        {isMounted ? <DigitGroup prefix="s" digits={sDigits} /> : <PlaceholderGroup prefix="s" />}
      </div>
    </div>
  );
});
