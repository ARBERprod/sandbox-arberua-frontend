import { useCallback, useMemo, useState } from 'react';

interface SetFlag {
  on: () => void;
  off: () => void;
  toggle: () => void;
}

type UseBooleanOutput = [boolean, SetFlag]

export const useBoolean = (initialState: boolean):UseBooleanOutput => {
  const [flag, setFlag] = useState(initialState);

  const on = useCallback(() => {
    setFlag(true);
  }, []);
  const off = useCallback(() => {
    setFlag(false);
  }, []);
  const toggle = useCallback(() => {
    setFlag((prev) => !prev);
  }, []);

  const setFlagObject = useMemo(() => ({
    on, off, toggle,
  }), [off, on, toggle]);

  return [flag, setFlagObject];
};
