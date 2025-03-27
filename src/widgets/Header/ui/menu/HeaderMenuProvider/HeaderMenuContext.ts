import { createContext } from 'react';

interface HeaderMenuContextProps {
  isHovered: boolean;
  setIsHoveredHandler: () => void;
  setIsNotHoveredHandler: () => void;
}

export const HeaderMenuContext = createContext<HeaderMenuContextProps>({} as HeaderMenuContextProps);
