import { useCallback } from 'react';

export const useThrottle = (fn: (...args: any[]) => any, delay: number) => {
  let isThrottled = false;
  let savedArgs: null;
  let savedThis: any;

  const wrapper = function wrapperFn() {
    if (isThrottled) { // (2)
      // @ts-ignore
      // eslint-disable-next-line
      savedArgs = arguments;
      // @ts-ignore
      // eslint-disable-next-line
      savedThis = this;
      return;
    }

    // @ts-ignore
    // eslint-disable-next-line
    fn.apply(this, arguments); // (1)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    isThrottled = true;

    setTimeout(() => {
      isThrottled = false; // (3)
      if (savedArgs) {
        // @ts-ignore
        wrapper.apply(savedThis, savedArgs);
        // eslint-disable-next-line no-multi-assign
        savedArgs = savedThis = null;
      }
    }, delay);
  };

  return useCallback(wrapper, []);
};
