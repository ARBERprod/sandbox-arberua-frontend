import cn from 'classnames';
import { MenuButton, MenuButtonProps } from '@/shared/ui/MenuButton';
import MenuIcon from '@/shared/assets/icons/hamburger.svg';
import CloseIcon from '@/shared/assets/icons/close-3.svg';
import styles from './HeaderMenuButton.module.scss';

interface HeaderMenuButtonProps extends MenuButtonProps {
  expanded?: boolean;
  isMobile?: boolean;
}

export const HeaderMenuButton = ({
  className, expanded, isMobile, ...rest
}:HeaderMenuButtonProps) => {
  const Icon = (expanded && isMobile) ? CloseIcon : MenuIcon;

  return (
    <MenuButton className={cn(styles.root, className)} Icon={Icon} {...rest} />
  );
};
