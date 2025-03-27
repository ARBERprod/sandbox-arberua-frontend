import { useCallback, useState } from 'react';
import { useThrottle } from '@/shared/lib/hooks/useThrottle';
import { usePathname } from 'next/navigation';
import { useEnhancedEffect } from '@/shared/lib/hooks/useEnhancedEffect';

const DEFAULT_OFFSET = 100;

export const useHiddenMenu = (offset:number = DEFAULT_OFFSET) => {
  const [isHidden, setIsHidden] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const scrollHandler = useCallback(() => {
    if (window.scrollY > offset) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  }, [offset]);

  const throttled = useThrottle(scrollHandler, 200);

  useEnhancedEffect(() => {
    if (isHomePage) {
      scrollHandler();
      window.addEventListener('scroll', throttled);

      return () => {
        window.removeEventListener('scroll', throttled);
      };
    }
    // eslint-disable-next-line
  }, []);

  return isHidden;
};
