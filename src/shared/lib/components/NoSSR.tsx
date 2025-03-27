import { ReactNode, useEffect, useState } from 'react';
import { useEnhancedEffect } from '@/shared/lib/hooks/useEnhancedEffect';

interface NoSSRProps {
  defer?: boolean;
  fallback?: ReactNode;
  children: ReactNode;
}

export const NoSSR = ({
  children,
  defer = false,
  fallback,
}: NoSSRProps) => {
  const [isMounted, setMountedState] = useState(false);

  useEnhancedEffect(() => {
    if (!defer) setMountedState(true);
  }, [defer]);

  useEffect(() => {
    if (defer) setMountedState(true);
  }, [defer]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isMounted ? children : fallback}
    </>
  );
};
