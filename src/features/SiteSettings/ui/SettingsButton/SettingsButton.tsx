import { memo } from 'react';
import cn from 'classnames';
import { Svg } from '@/shared/ui/Svg';
import ArrowRightIcon from '@/shared/assets/icons/arrow-right.svg';
import { useSiteSettingsModel } from '@/features/SiteSettings';
import { useTranslation } from 'next-i18next';
import styles from './SettingsButton.module.scss';

interface SettingsButtonProps {
  className?: string;
}

export const SettingsButton = memo(({
  className,
}: SettingsButtonProps) => {
  const $$siteSettingsModel = useSiteSettingsModel();

  const openModal = () => {
    $$siteSettingsModel.openSettingsModal();
  };
  const { t } = useTranslation();
  return (
    <button type="button" onClick={openModal} className={cn(styles.link, className)}>
      <div className={styles.text}>
        {t('lang.menu.text')}
      </div>
      <Svg Icon={ArrowRightIcon} className={styles.icon} height="14" />
    </button>
  );
});
