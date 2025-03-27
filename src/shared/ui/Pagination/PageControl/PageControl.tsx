import { memo, ReactNode } from 'react';
import cn from 'classnames';
import { Typography } from '@/shared/ui/Typography';
import styles from './PageControl.module.scss';
import Link from 'next/link';

interface PageControlProps {
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  href?: string;
  children: ReactNode;
}

export const PageControl = memo(({
  className, children, isActive, onClick, disabled, href,
}: PageControlProps) => {
  const clickHandler = () => {
    if (disabled) return;
    if (isActive) return;
    onClick?.();
  };
  const mods = {
    [styles.active]: isActive,
    [styles.disabled]: disabled,
  };
  if (href && !disabled) {
    return (
      <Link href={href} onClick={clickHandler}>
        <Typography as="span" variant="body-3" className={cn(styles.root, mods, className)}>
          {children}
        </Typography>
      </Link>
    );
  }
  return (
    <Typography as="button" variant="body-3" onClick={clickHandler} className={cn(styles.root, mods, className)}>
      {children}
    </Typography>
  );
});
