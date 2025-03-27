import { ReactNode, useCallback, useEffect } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { sessionFetch } from '@/entities/Session';
import { csrf } from '@/shared/api/csrf';

interface AppLoaderProps {
  children: ReactNode;
}

export const AppLoader = ({ children }: AppLoaderProps) => {
  const dispatch = useAppDispatch();
  const loadApp = useCallback(async () => {
    await csrf();
    dispatch(
      sessionFetch.initiate(),
    );
  }, [dispatch]);
  useEffect(() => {
    loadApp();
  }, [loadApp]);
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {children}
    </>
  );
};
