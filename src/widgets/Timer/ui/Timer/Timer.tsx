import React, { useState, useEffect, useCallback } from 'react';
import styles from './Timer.module.scss';
import { useTranslation } from 'next-i18next';

interface TimerProps {
    deadline: string | Date;
}

export const Timer: React.FC<TimerProps> = ({ deadline }) => {
  const [currentDeadline, setCurrentDeadline] = useState<Date>(
    typeof deadline === 'string' ? new Date(deadline) : deadline,
  );
  const { t } = useTranslation();

  const calculateTimeLeft = useCallback(() => {
    const now: Date = new Date();
    const FIXED_DATE = new Date('2024-12-04T23:59:59');

    const difference: number = currentDeadline.getTime() - now.getTime();

    if (difference > 0) {
      return {
        hours: String(Math.floor(difference / (1000 * 60 * 60))).padStart(2, '0'),
        minutes: String(Math.floor((difference / (1000 * 60)) % 60)).padStart(2, '0'),
        seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, '0'),
      };
    }

    setCurrentDeadline(FIXED_DATE);
    return null;
  }, [currentDeadline]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      const time = calculateTimeLeft();
      setTimeLeft(time);
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  if (!timeLeft) {
    return null;
  }

  return (
    <a href="catalog/black-friday-sale" className={styles.timer}>
      <span className={styles.label}>{t('timer-text')}</span>
      <div className={styles.digits}>
        <div className={styles.block}>{timeLeft.hours[0]}</div>
        <div className={styles.block}>{timeLeft.hours[1]}</div>
        <span className={styles.colon}>:</span>
        <div className={styles.block}>{timeLeft.minutes[0]}</div>
        <div className={styles.block}>{timeLeft.minutes[1]}</div>
        <span className={styles.colon}>:</span>
        <div className={styles.block}>{timeLeft.seconds[0]}</div>
        <div className={styles.block}>{timeLeft.seconds[1]}</div>
      </div>
    </a>
  );
};
