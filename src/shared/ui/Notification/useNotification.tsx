import { ReactNode, useCallback } from 'react';
import { toast, ToastPosition, TypeOptions } from 'react-toastify';
import { Notification } from './Notification';
import { NotificationType } from './types';

export interface NotificationOptions {
  title?: string;
  subtitle?: string;
  content?: string;
  additional?: ReactNode;
  withCloseButton?: boolean;
  type?: NotificationType;
  position?: ToastPosition;
}

interface UseNotificationOptions extends NotificationOptions {
}

export const useNotification = ({
  type, content, title, additional, subtitle, withCloseButton, position = 'top-right',
}: UseNotificationOptions) => {
  const defaultData = {
    title, subtitle, additional, content, withCloseButton, type, position,
  };
  const notify = useCallback(({
    type = defaultData.type,
    title = defaultData.title,
    content = defaultData.content,
    subtitle = defaultData.subtitle,
    additional = defaultData.additional,
    withCloseButton = defaultData.withCloseButton,
    position = defaultData.position,
  }: NotificationOptions = {}) => {
    toast(({ closeToast, toastProps }) => (
      <Notification
        closeToast={closeToast}
        toastProps={toastProps}
        title={title}
        subtitle={subtitle}
        additional={additional}
        content={content}
        withCloseButton={withCloseButton}
      />
    ), {
      type: (type as TypeOptions) || 'success' as TypeOptions,
      position,
    });
  }, [
    defaultData.additional,
    defaultData.content,
    defaultData.position,
    defaultData.subtitle,
    defaultData.title,
    defaultData.type,
    defaultData.withCloseButton,
  ]);

  return { notify };
};

export const getNotify = ({
  type, content, title, additional, subtitle, withCloseButton, position = 'top-right',
}: UseNotificationOptions) => {
  const defaultData = {
    title, subtitle, additional, content, withCloseButton, type, position,
  };
  const notify = ({
    type = defaultData.type,
    title = defaultData.title,
    content = defaultData.content,
    subtitle = defaultData.subtitle,
    additional = defaultData.additional,
    withCloseButton = defaultData.withCloseButton,
    position = defaultData.position,
  }: NotificationOptions = {}) => {
    toast(({ closeToast, toastProps }) => (
      <Notification
        closeToast={closeToast}
        toastProps={toastProps}
        title={title}
        subtitle={subtitle}
        additional={additional}
        content={content}
        withCloseButton={withCloseButton}
      />
    ), {
      type: (type as TypeOptions) || 'success' as TypeOptions,
      position,
    });
  };

  return { notify };
};
