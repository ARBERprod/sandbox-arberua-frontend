import cn from 'classnames';
import AppStoreIcon from '@/shared/assets/icons/app-store.svg';
import { Button, ButtonProps } from '@/shared/ui/Button';
import { AppImage } from '@/shared/ui/AppImage';
import GooglePlayIcon from '@/shared/assets/icons/google-play-2.png';
import styles from './FooterStoreButtons.module.scss';

interface FooterStoreButtonsProps extends Omit<ButtonProps<'button'>, 'children'> {
}

export const FooterStoreButtons = ({ className, variant, size }:FooterStoreButtonsProps) => (
  <ul className={cn(styles.list, className)}>
    <li className={cn(styles.list_item)}>
      <Button size={size} variant={variant} className={styles.button}>
        <div className={cn(styles.icon_appstore, styles[`icon_${variant}`])}>
          <AppStoreIcon />
        </div>
      </Button>
    </li>
    <li className={cn(styles.list_item)}>
      <Button size={size} variant={variant} className={styles.button}>
        <div className={cn(styles.icon_google, styles[`icon_${variant}`])}>
          <AppImage src={GooglePlayIcon} alt="Googlplay button" className={styles.googleplay} />
        </div>
      </Button>
    </li>
  </ul>
);
