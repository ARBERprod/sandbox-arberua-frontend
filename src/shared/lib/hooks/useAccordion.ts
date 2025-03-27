import {
  Ref, useCallback, useEffect, useRef,
} from 'react';
import { useEnhancedEffect } from '@/shared/lib/hooks/useEnhancedEffect';
import { useBoolean } from './useBoolean';

interface UseAccordionResult<T extends HTMLElement> {
  ref: Ref<T>;
  isVisible: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
  updateAccordion: () => void;
}

const ANIMATION_DURATION = 300;

export const useAccordion = <T extends HTMLElement>(initOpen = false): UseAccordionResult<T> => {
  const [isVisible, setVisible] = useBoolean(initOpen);
  const ref = useRef<T | null>(null);
  const firstRenderRef = useRef(true);
  const updateAccordion = useCallback(() => {
    if (!ref.current) return;
    if (isVisible) {
      const height = `${ref.current.scrollHeight}px`;
      ref.current.style.setProperty('--max-height', height);
      setTimeout(() => {
        ref.current?.style.setProperty('--max-height', 'auto');
        ref.current?.style.setProperty('height', 'fit-content');
        ref.current?.style.removeProperty('overflow');
      }, ANIMATION_DURATION);
    } else {
      const height = `${ref.current.scrollHeight}px`;
      ref.current?.style.setProperty('--max-height', height);
      setTimeout(() => {
        ref.current?.style.setProperty('overflow', 'hidden');
        ref.current?.style.setProperty('--max-height', '0');
      }, 0);
    }
  }, [isVisible]);
  useEnhancedEffect(() => {
    if (!ref.current) return;
    const initialHeight = initOpen ? `${ref.current?.scrollHeight}px` : '0';
    if (initOpen) {
      ref.current?.style.removeProperty('overflow');
    } else {
      ref.current?.style.setProperty('overflow', 'hidden');
    }
    ref.current.style.setProperty('--max-height', initialHeight);
    ref.current.style.setProperty('max-height', 'var(--max-height)');
    ref.current.style.setProperty('transition', `max-height ${ANIMATION_DURATION}ms ease`);
  }, [initOpen]);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
    } else {
      updateAccordion();
    }
  }, [updateAccordion, isVisible]);

  return {
    ref,
    isVisible,
    toggle: setVisible.toggle,
    close: setVisible.off,
    open: setVisible.on,
    updateAccordion,
  };
};
