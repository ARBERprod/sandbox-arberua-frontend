import { useNotification } from '@/shared/ui/Notification/useNotification';
import { useTranslation } from 'next-i18next';

export const useErrorNotification = (title?: string) => {
  const { t } = useTranslation();
  const { notify } = useNotification({ type: 'error', title: title || t('something_went_wrong') });
  return { notify };
};
