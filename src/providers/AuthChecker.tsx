import {
  FC, ReactNode, useCallback, useEffect, useState,
} from 'react';
import { routerPaths } from '@/shared/config/router';
import { useRouter } from 'next/router';
import { PageLoader } from '@/shared/ui/Loader';
import { useAuth } from '@/entities/Session';

interface AuthCheckerProps {
  children: ReactNode;
  redirectIfAuth?:boolean;
  redirectPath?: string;
  privateRoute?: boolean;
}

export const AuthChecker: FC<AuthCheckerProps> = ({
  redirectIfAuth = false,
  redirectPath = routerPaths.main,
  children,
  privateRoute = false,
}) => {
  const { push } = useRouter();
  const { isAuth, isLoaded } = useAuth();
  const [inited, setInited] = useState(false);
  const checkAuth = useCallback(async () => {
    if (isLoaded && privateRoute && !isAuth) {
      await push(redirectPath);
    }
    if (isLoaded && isAuth && redirectIfAuth) {
      await push(redirectPath);
    }
  }, [isAuth, isLoaded, privateRoute, push, redirectIfAuth, redirectPath]);

  useEffect(() => {
    checkAuth().then(() => {
      setInited(true);
    });
  }, [checkAuth]);

  if ((!isLoaded || !isAuth) && privateRoute) return <PageLoader />;
  if ((!isLoaded || isAuth) && redirectIfAuth) return <PageLoader />;
  if (!inited) return <PageLoader />;
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {children}
    </>
  );
};
