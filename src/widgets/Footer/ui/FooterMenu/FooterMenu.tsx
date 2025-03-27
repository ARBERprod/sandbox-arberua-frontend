import cn from 'classnames';
import Link from 'next/link';
import styles from './FooterMenu.module.scss';
import { Typography } from '@/shared/ui/Typography';

export enum FooterMenuVariants {
  DEFAULT = '',
  SECONDARY = 'secondary',
}

export interface FooterMenuProps {
  className?: string;
  items?: any;
  variant?: FooterMenuVariants,
}

export const FooterMenu = ({ className, items, variant = FooterMenuVariants.DEFAULT }:FooterMenuProps) => (
  <div className={cn(styles.root, className)}>
    {!!items.length && (
      <ul className={cn(styles.menu)}>
        {items.map((item: any) => (
          <li key={item.url} className={cn(styles.item, styles[variant])}>
            <Link href={item.url} className={cn(styles.item_link)}>
              <Typography weight={300} variant="body-2" className={styles.item_text} as="span">
                {item.title}
              </Typography>
            </Link>
          </li>
        ))}
      </ul>
    )}
  </div>
);
