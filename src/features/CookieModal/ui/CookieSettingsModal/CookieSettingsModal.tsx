import cn from 'classnames';
import { Typography } from '@/shared/ui/Typography';
import { memo, useState } from 'react';
import { useTranslation } from 'next-i18next';
import styles from './CookieSettingsModal.module.scss';
import { OverlayingModal } from '@/shared/ui/Modal';
import { ModalProps } from '@/shared/ui/Modal/types/ModalProps';
import CloseIcon from '@/shared/assets/icons/close.svg';
import { Svg } from '@/shared/ui/Svg';
import { CookieSettingBlock } from '@/features/CookieModal/ui/CookieSettingsModal/CookieSettingBlock/CookieSettingBlock';
import { Button } from '@/shared/ui/Button';

interface CookieSettingsModalProps extends ModalProps {
  className?: string;
  onClick?: () => void;
}

export const CookieSettingsModal = memo(({
  className,
  onClose,
  isOpen,
  width = 720,
  lazy = true,
  centered = true,
  onClick,
}: CookieSettingsModalProps) => {
  const { t } = useTranslation();
  const [switches, setSwitches] = useState({
    required: true,
    analytics: false,
    personalization: false,
    advertising: false,
  });

  const handleToggleChange = (name: string, value: boolean) => {
    setSwitches((prevSwitches) => ({
      ...prevSwitches,
      [name]: value,
    }));
  };

  return (
    <OverlayingModal
      width={width}
      centered={centered}
      lazy={lazy}
      isOpen={isOpen}
      className={cn(styles.overlay, className)}
    >
      <div className={cn(styles.root, className)}>
        <button className={styles.closeBtn} onClick={onClose}>
          <Svg Icon={CloseIcon} stroke="grey" width={14} height={14} />
        </button>
        <Typography variant="title-3" centered className={styles.title}>
          {t('cookie-modal.title')}
        </Typography>
        <Typography variant="body-1" centered className={styles.subtitle}>
          {t('cookie-modal-setting.customize')}
        </Typography>
        <CookieSettingBlock
          title={t('cookie-modal-setting.title.required')}
          description={t('cookie-modal-setting.title.required-description')}
          name="required"
          value={switches.required}
          onChange={handleToggleChange}
          disabled
        />
        <CookieSettingBlock
          title={t('cookie-modal-setting.title.analytics')}
          description={t('cookie-modal-setting.title.analytics-description')}
          name="analytics"
          value={switches.analytics}
          onChange={handleToggleChange}
        />
        <CookieSettingBlock
          title={t('cookie-modal-setting.title.personalization')}
          description={t('cookie-modal-setting.title.personalization-description')}
          name="personalization"
          value={switches.personalization}
          onChange={handleToggleChange}
        />
        <CookieSettingBlock
          title={t('cookie-modal-setting.title.advertising')}
          description={t('cookie-modal-setting.title.advertising-description')}
          name="advertising"
          value={switches.advertising}
          onChange={handleToggleChange}
        />
        <div className={styles.actions}>
          <Button onClick={onClick} size="large" className={styles.btn}>{t('cookie-modal.agree')}</Button>
          <Button onClick={onClick} size="large" className={styles.btn} color="light-secondary">{t('confirm')}</Button>
        </div>
      </div>
    </OverlayingModal>
  );
});
