import { memo, useState } from 'react';
import { useTranslation } from 'next-i18next';

interface CounterProps {
  className?: string;
  initValue?: number;
  title: string;
}

export const Counter = memo(({ className, initValue = 0, title }: CounterProps) => {
  const [count, setCount] = useState(initValue);
  const { t } = useTranslation();
  return (
    <div data-testid="Counter" className={className}>
      <h2 data-testid="Counter.title">{title}</h2>
      <h3>{t('color')}</h3>
      <span data-testid="Counter.count">{count}</span>
      <button data-testid="Counter.decr" onClick={() => setCount((prev) => prev - 1)}>-</button>
      <button data-testid="Counter.incr" onClick={() => setCount((prev) => prev + 1)}>+</button>
    </div>
  );
});
