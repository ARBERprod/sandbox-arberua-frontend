import { useCallback, useEffect, useState } from 'react';
import { useThrottle } from '@/shared/lib/hooks/useThrottle';

const DEFAULT_OFFSET = 80;

export const useFixedHeader = (offset:number = DEFAULT_OFFSET) => {
  const [isFixed, setFixed] = useState(false);

  const scrollHandler = useCallback(() => {
    if (window.scrollY > offset) {
      setFixed(true);
    } else {
      setFixed(false);
    }
  }, [offset]);

  const throttled = useThrottle(scrollHandler, 200);

  useEffect(() => {
    window.addEventListener('scroll', throttled);

    return () => {
      window.removeEventListener('scroll', throttled);
    };
    // eslint-disable-next-line
  }, []);

  return isFixed;
};
