import { createContext } from 'react';

interface FloatingContextValue {
  appendElement: (elementId: string) => void;
  removeElement: (elementId: string) => void;
}

export const FloatingContext = createContext<FloatingContextValue>({} as FloatingContextValue);
