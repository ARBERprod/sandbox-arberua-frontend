import { useMemo, useReducer, useState } from 'react';

export type UseSetResult<Value> = {
  has: (value: Value) => void;
  add: (value: Value) => void;
  delete: (value: Value) => void;
  clear: () => void;
  forEach: (cb: (item: Value) => void) => void;
  size: number;
}

export const useSet = <Value>(
  initialItems?: Iterable<Value> | (() => Iterable<Value>),
): UseSetResult<Value> => {
  const [version, updateVersion] = useReducer((v) => v + 1, 0);
  const [set] = useState(() => {
    const entries = typeof initialItems === 'function' ? initialItems() : initialItems;
    return new Set(entries);
  });

  const reactSet = useMemo(() => {
    const actualSet = {
      has(value: Value) {
        return set.has(value);
      },
      add(value: Value) {
        set.add(value);
        updateVersion();
        return actualSet;
      },
      delete(value: Value) {
        set.delete(value);
        updateVersion();
        return actualSet;
      },
      clear() {
        updateVersion();
        set.clear();
      },
      forEach(cb: (item: Value) => void) {
        set.forEach(cb);
      },
      get size() {
        return set.size;
      },

    };

    return actualSet;
    // eslint-disable-next-line
  }, [version, set]);

  return reactSet;
};
