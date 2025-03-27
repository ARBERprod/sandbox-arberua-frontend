import {
  memo, useState, useMemo, useCallback, ReactNode,
} from 'react';
import { HeaderMenuContext } from './HeaderMenuContext';

interface HeaderMenuProviderProps {
  children: ReactNode;
  initIsHovered: boolean;
}

export const HeaderMenuProvider = memo(({
  initIsHovered = false,
  children,
}:HeaderMenuProviderProps) => {
  const [isHovered, setIsHovered] = useState(initIsHovered);

  const setIsHoveredHandler = useCallback(() => {
    setIsHovered(true);
  }, []);

  const setIsNotHoveredHandler = useCallback(() => {
    setIsHovered(false);
  }, []);

  const providedValue = useMemo(() => ({
    isHovered,
    setIsHoveredHandler,
    setIsNotHoveredHandler,
  }), [isHovered, setIsHoveredHandler, setIsNotHoveredHandler]);

  return (
    <HeaderMenuContext.Provider value={providedValue}>
      {children}
    </HeaderMenuContext.Provider>
  );
});
