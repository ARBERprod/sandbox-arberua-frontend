import { useContext, useEffect } from 'react';
import { FloatingContext } from './floatingContext';

type UseBodyOverflowOptions = {
  elementId: string;
  condition: boolean;
  unlockOnUnmount?: boolean;
}
export const useBodyOverflow = ({ condition, elementId, unlockOnUnmount }: UseBodyOverflowOptions) => {
  const { removeElement, appendElement } = useContext(FloatingContext);

  useEffect(() => {
    if (condition) {
      appendElement(elementId);
    } else {
      removeElement(elementId);
    }

    return () => {
      if (unlockOnUnmount) {
        removeElement(elementId);
      }
    };
  }, [appendElement, condition, elementId, removeElement, unlockOnUnmount]);
};
