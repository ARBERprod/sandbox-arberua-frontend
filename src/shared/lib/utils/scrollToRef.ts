import { MutableRefObject } from 'react';

export const scrollToRef = <T extends HTMLElement>(elementRef: MutableRefObject<T | null>, offset = 100) => {
  if (!elementRef.current) return;
  const y = elementRef.current.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({
    top: y,
    behavior: 'smooth',
  });
};
