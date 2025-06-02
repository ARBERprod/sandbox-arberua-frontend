import {
  ReactNode, useCallback, useEffect, useMemo, useState,
} from 'react';
import { useSet } from '@/shared/lib/hooks/useSet';
import { HEADER_ELEMENT_ID } from '@/shared/constants/common';
import { FloatingContext } from './floatingContext';
import { useMobileDetect } from '@/shared/lib/hooks/useMobileDetect';

interface FloatingProviderProps {
  children?: ReactNode;
}

// const SCROLLBAR_WIDTH = 17;

export const FloatingProvider = ({ children }: FloatingProviderProps) => {
  const elementsSet = useSet<string>([]);
  const { isDesktop } = useMobileDetect();
  const [isOverflowHidden, setIsOverflowHidden] = useState(false);

  useEffect(() => {
    setIsOverflowHidden(elementsSet.size > 0);
  }, [elementsSet.size]);

  useEffect(() => {
    if (isOverflowHidden) {
      document.body.classList.add('overflow-hidden');
      if (isDesktop()) {
        document.body.classList.add('scrollbar-padding');
      }
    } else {
      document.body.classList.remove('overflow-hidden');
      document.body.classList.remove('scrollbar-padding');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
      document.body.classList.remove('scrollbar-padding');
    };
  }, [isOverflowHidden, isDesktop]);

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
