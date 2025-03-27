import { memo, ReactNode } from 'react';
import cn from 'classnames';
import { Typography } from '@/shared/ui/Typography';
import styles from './ContactUsFormWrapper.module.scss';

interface ContactUsFormWrapperProps {
  className?: string;
  title?: string;
  slotLeft?: ReactNode;
  slotRight?: ReactNode;
  background?: 'regular' | 'grey';
  variant?: 'primary' | 'secondary';
}

export const ContactUsFormWrapper = memo(({
  className,
  title,
  background = 'regular',
  variant = 'primary',
  slotLeft,
  slotRight,
}:ContactUsFormWrapperProps) => (
  <div className={cn(styles.root, styles[background], className)}>
    {title && <Typography variant="body-1" className={cn(styles.title, styles[variant])}>{title}</Typography>}
    <div className={cn(styles.inner, styles[variant])}>
      {slotLeft && (
        <div className={styles.item}>
          {slotLeft}
        </div>
      )}
      {slotRight && (
        <div className={styles.item}>
          {slotRight}
        </div>
      )}
    </div>
  </div>
));
