import { memo } from 'react';
import cn from 'classnames';
import { AppImage } from '@/shared/ui/AppImage';
import Image from '@/shared/assets/images/settings.jpg';

import styles from './SettingsImage.module.scss';

interface SettingsImageProps {
  className?: string;
}

export const SettingsImage = memo(({ className }: SettingsImageProps) => (
  <div className={cn(styles.root, className)}>
    <AppImage alt="settings" src={Image} className={styles.image} />
  </div>
));
