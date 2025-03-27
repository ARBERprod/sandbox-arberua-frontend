import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth, useLogoutMutation, useSessionActions } from '@/entities/Session';
import { routerPaths } from '@/shared/config/router';
import { StatusCode } from '@/shared/types/api';

const LogoutPage = () => {
  const { push } = useRouter();
  const { isAuth } = useAuth();
  const { logout } = useSessionActions();
  const [logoutQuery] = useLogoutMutation();
  const onLogout = useCallback(async () => {
    try {
      if (isAuth) {
        await logoutQuery();
        logout();
      }
      push(routerPaths.main);
    } catch (e) {
      const error = e as any;
      if (error.response?.status === StatusCode.UNAUTHORIZED) {
        logout();
      }
      push(routerPaths.main);
    }
  }, [isAuth, logout, logoutQuery, push]);
  useEffect(() => {
    onLogout();
    // eslint-disable-next-line
  }, []);
  return null;
};

export default LogoutPage;
