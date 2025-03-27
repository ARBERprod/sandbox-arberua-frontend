import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Notifications.module.scss';

interface NotificationsProviderProps {
  children: ReactNode;
}

export const NotificationsProvider = ({ children }:NotificationsProviderProps) => (
  <>
    <ToastContainer
      className={styles.root}
      toastClassName={styles.toast}
      pauseOnHover={false}
      limit={4}
      closeButton={false}
      hideProgressBar
      icon={false}
    />
    {children}
  </>
);
