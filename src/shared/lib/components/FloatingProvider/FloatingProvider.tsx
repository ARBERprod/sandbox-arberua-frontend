import {
  ReactNode, useCallback, useEffect, useMemo,
} from 'react';
import { useSet } from '@/shared/lib/hooks/useSet';
import { HEADER_ELEMENT_ID } from '@/shared/constants/common';
import { FloatingContext } from './floatingContext';
import { useMobileDetect } from '@/shared/lib/hooks/useMobileDetect';

interface FloatingProviderProps {
  children?: ReactNode;
}

const SCROLLBAR_WIDTH = 17;

export const FloatingProvider = ({ children }: FloatingProviderProps) => {
  const elementsSet = useSet<string>([]);
  const { isDesktop } = useMobileDetect();

  useEffect(() => {
    if (elementsSet.size > 0) {
      document.body.style.setProperty('overflow', 'hidden');
      if (isDesktop()) {
        document.body.style.setProperty('padding-right', `${SCROLLBAR_WIDTH}px`);
        document.getElementById(HEADER_ELEMENT_ID)?.style.setProperty('padding-right', `${SCROLLBAR_WIDTH}px`);
      }
    } else {
      document.body.style.removeProperty('overflow');
      if (isDesktop()) {
        document.body.style.removeProperty('padding-right');
        document.getElementById(HEADER_ELEMENT_ID)?.style.removeProperty('padding-right');
      }
    }
  }, [elementsSet.size, isDesktop]);

  const appendElement = useCallback((elementId: string) => {
    elementsSet.add(elementId);
    // eslint-disable-next-line
  }, []);

  const removeElement = useCallback((elementId: string) => {
    elementsSet.delete(elementId);
    // eslint-disable-next-line
  }, []);

  const providedValue = useMemo(() => ({
    appendElement,
    removeElement,
  }), [appendElement, removeElement]);
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <FloatingContext.Provider value={providedValue}>
      {children}
    </FloatingContext.Provider>
  );
};
