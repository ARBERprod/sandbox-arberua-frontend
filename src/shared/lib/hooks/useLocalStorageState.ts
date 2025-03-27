import { SetStateAction, useEffect, useState } from 'react';
import { localStorageService } from '@/shared/lib/services/localStorage.service';
import { isFunction } from '@/shared/types/type-guards';
import { useEvent } from '@/shared/lib/hooks/useEvent';
import { COOKIE_VIEW_KEY } from '@/shared/constants/common';

export const useLocalStorageState = <Value>(key: string, initValue:(() => Value) | Value) => {
  const [value, setValue] = useState(initValue);

  useEffect(() => {
    if (localStorageService.has(COOKIE_VIEW_KEY)) {
      setValue(localStorageService.get(COOKIE_VIEW_KEY) as Value);
    }
  }, []);

  const setNextValue = useEvent((newValue:SetStateAction<Value>) => {
    const newActualValue = isFunction(newValue) ? newValue(value) : newValue;

    localStorageService.set(key, newActualValue);
    setValue(newActualValue);
  });

  return [value, setNextValue] as const;
};
