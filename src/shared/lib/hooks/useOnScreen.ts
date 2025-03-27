import { MutableRefObject, useEffect, useState } from 'react';

export const useOnScreen = (elementRef: MutableRefObject<HTMLElement | null>) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, {
      rootMargin: '0px',
    });
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        // eslint-disable-next-line
        observer.unobserve(elementRef.current);
      }
    };
    // eslint-disable-next-line
  }, []);

  return isVisible;
};
