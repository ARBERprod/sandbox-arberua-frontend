import cn from 'classnames';
import styles from './CookieModal.module.scss';
import { cookieModalManager } from '../../lib/CookieModalManager';
import { Typography } from '@/shared/ui/Typography';
import { useEffect, useState } from 'react';
import { Button } from '@/shared/ui/Button';
import { useTranslation } from 'next-i18next';
import { CookieSettingsModal } from '../CookieSettingsModal';

interface CookieModalProps {
  className?: string;
}

export const CookieModal = ({ className }: CookieModalProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(!cookieModalManager.isCookiesAccepted());
  const [isOpenSetting, setIsOpenSetting] = useState(false);
  const [client, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);
  const acceptAllCookies = () => {
    cookieModalManager.acceptAll();
    setIsOpen(false);
  };

  if (!isOpen || !client) return null;

  return (
    <div>
      <div className={cn(styles.root, className)}>
        <Typography variant="body-2">
          {t('cookie-modal.paragraph')}
        </Typography>
        <div className={styles.actions}>
          <Button onClick={() => setIsOpenSetting(true)} size="large" className={styles.btn} color="light-secondary">{t('cookie-modal.setting')}</Button>
          <Button onClick={acceptAllCookies} size="large" className={styles.btn}>{t('cookie-modal.agree')}</Button>
        </div>
      </div>
      <CookieSettingsModal isOpen={isOpenSetting} onClose={() => setIsOpenSetting(false)} onClick={acceptAllCookies} />
    </div>
  );
};
