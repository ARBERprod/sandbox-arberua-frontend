import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth, useLogoutMutation, useSessionActions } from '@/entities/Session';
import { routerPaths } from '@/shared/config/router';

const LogoutPage = () => {
  const { push } = useRouter();
  const { isAuth } = useAuth();
  const { logout } = useSessionActions();
  const [logoutQuery] = useLogoutMutation();

  useEffect(() => {
    const performLogout = async () => {
      if (isAuth) {
        try {
          await logoutQuery().unwrap();
        } catch (error) {
          console.warn('Logout API call failed:', error);
        }
      }
      logout();
      push(routerPaths.main);
    };
    performLogout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default LogoutPage;
