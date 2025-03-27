import cn from 'classnames';
import { SettingsButton } from '@/features/SiteSettings';
import styles from './HeaderMenuLocale.module.scss';

interface HeaderMenuLocaleProps {
  className?: string;
  expanded?: boolean;
}

export const HeaderMenuLocale = ({ className, expanded }:HeaderMenuLocaleProps) => {
  const expandedClassName = expanded ? 'expanded' : '';

  return (
    <div className={cn(styles.root, styles[expandedClassName], className)}>
      <SettingsButton />
    </div>
  );
};
