import { memo, ReactElement, ReactNode } from 'react';
import cn from 'classnames';
import { Typography } from '@/shared/ui/Typography';
import { CardView } from '@/shared/types/common';
import Link from 'next/link';
import styles from './Card.module.scss';

export interface CardProps {
  className?: string;
  classes?: {
    title?: string;
    footerWrap?: string;
  };
  title?: string;
  badges?: ReactNode;
  actions?: ReactNode;
  footer?: ReactNode;
  view?: CardView;
  href?: string;
  hoverContent?: ReactElement | null;
  hoverBehavior?: 'slide' | 'fade';
  imageSlot?: ReactElement;
  sale?: number | null;
}

export const Card = memo(({
  className,
  classes,
  title = '',
  badges,
  actions,
  footer,
  hoverContent,
  href = '',
  hoverBehavior = 'slide',
  view = CardView.NORMAL,
  imageSlot,
  sale,
}: CardProps) => (
  <div
    data-testid="Card"
    className={cn(styles.root, className)}
  >
    {(!!sale || badges) && (
      <div className={cn(styles.badges, styles[view])}>
        {!!sale && (
          <span className={styles.sale}>
            -
            {sale}
            %
          </span>
        )}
        {badges}
      </div>
    )}
    <div className={styles.wrap}>
      <Link href={href} className={styles.image}>
        {imageSlot}
      </Link>
      {actions && <div className={cn(styles.actions, styles[view])}>{actions}</div>}
    </div>
    <footer className={cn(styles.footerWrap, classes?.footerWrap)}>
      {view !== CardView.SMALL && hoverContent && (
        <div className={cn(styles.hoverContent, styles[hoverBehavior])}>
          {hoverContent}
        </div>
      )}
      <Typography variant="body-2" color="black" className={cn(styles.title, classes?.title)}>
        {title}
      </Typography>
      {footer && (
        <div className={styles.footer}>
          {footer}
        </div>
      )}
    </footer>
  </div>
));
