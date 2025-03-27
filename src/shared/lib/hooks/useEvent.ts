import { useCallback, useRef } from 'react';
import { useEnhancedEffect } from '@/shared/lib/hooks/useEnhancedEffect';

export const useEvent = <T extends (...args: any[]) => any>(cb: T) => {
  const cbRef = useRef(cb);
  useEnhancedEffect(() => {
    cbRef.current = cb;
  }, [cb]);
  return useCallback((...args: Parameters<T>) => cbRef.current.apply(null, args), [cbRef]);
};
