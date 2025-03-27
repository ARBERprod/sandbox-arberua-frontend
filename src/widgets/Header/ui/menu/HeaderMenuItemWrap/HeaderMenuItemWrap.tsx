import {
  memo, useEffect, useCallback, ReactNode,
} from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { useAccordion } from '@/shared/lib/hooks/useAccordion';
import { useThrottle } from '@/shared/lib/hooks/useThrottle';
import { useEnhancedEffect } from '@/shared/lib/hooks/useEnhancedEffect';
import { usePathname } from 'next/navigation';
import { CurrentMenuType, MenuLink, MenuLinkView } from '../../../model/types';
import { HeaderMenuListItems } from '../HeaderMenuListItems';
import { useHeaderMenu } from '../HeaderMenuProvider/useHeaderMenu';

import styles from './HeaderMenuItemWrap.module.scss';

interface HeaderMenuItemWrapProps {
  className?: string;
  href?: string;
  children: ReactNode;
  type?: MenuLinkView;
  targetMenu?: CurrentMenuType | false;
  nested?: MenuLink[] | false;
  onClick?: (type: CurrentMenuType) => void;
  openNewPage?: boolean;
  color?: string;
  bold?: boolean;
}

export const HeaderMenuItemWrap = memo(({
  className,
  type = 'link',
  children,
  href = '',
  targetMenu,
  nested,
  onClick,
  openNewPage,
  color,
  bold,
}:HeaderMenuItemWrapProps) => {
  const clickHandler = () => {
    if (targetMenu) {
      onClick?.(targetMenu);
    }
  };

  const linkClickHandler = () => {
    document.body.style.removeProperty('overflow');
  };

  const { isHovered } = useHeaderMenu();
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const { ref, toggle, close } = useAccordion<HTMLDivElement>(false);

  useEffect(() => {
    close();
  }, [isHovered, close]);

  const scrollHandler = useCallback(() => {
    close();
  }, [close]);

  const throttled = useThrottle(scrollHandler, 200);

  useEnhancedEffect(() => {
    if (isHomePage) {
      window.addEventListener('scroll', throttled);

      return () => {
        window.removeEventListener('scroll', throttled);
      };
    }
  }, []);

  if (type === 'accordion') {
    return (
      <>
        <div className={cn(styles.root, className)} onClick={toggle} role="presentation">
          {children}
        </div>
        {nested && !!nested?.length && <div ref={ref}><HeaderMenuListItems items={nested} isNested /></div>}
      </>
    );
  }

  if (type === 'button') {
    return (
      <button
        className={cn(styles.root, className)}
        onClick={clickHandler}
      >
        {children}
      </button>
    );
  }

  return (
    openNewPage ? (
      <a
        className={cn(styles.root, className)}
        href={href}
        onClick={linkClickHandler}
        target="_blank"
        rel="noreferrer"
        style={{
          color,
        }}
      >
        {children}
      </a>
    ) : (
      <Link
        className={cn(styles.root, className)}
        href={href}
        onClick={linkClickHandler}
        style={{
          color,
          ...(bold ? { fontWeight: 'bold' } : {}),
        }}
      >
        {children}
      </Link>
    )
  );
});
