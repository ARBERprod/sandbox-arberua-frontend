import cn from 'classnames';
import { useState, useEffect, useRef } from 'react';
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery';
import { breakpoints } from '@/shared/config/breakpoints';
import { useHiddenMenu } from '@/shared/lib/hooks/useHiddenMenu';
import { usePathname } from 'next/navigation';
import styles from './HeaderMenuContainer.module.scss';
import { HeaderMenu } from '../HeaderMenu';
import { HeaderMenuButton } from '../HeaderMenuButton';
import { HeaderMenuProvider } from '../HeaderMenuProvider';

interface HeaderMenuContainerProps {
  className?: string;
}

export const HeaderMenuContainer = ({ className }:HeaderMenuContainerProps) => {
  const isMobile = useMediaQuery(breakpoints['only-mobile']);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const [expanded, setExpanded] = useState(false);
  const [expandedOverlay, setExpandedOverlay] = useState(false);
  const [userClosed, setUserClosed] = useState(false);
  const isHiddenMenu = useHiddenMenu();

  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => {
    setUserClosed(true);
    setExpanded(false);
    setExpandedOverlay(false);
    document.body.style.setProperty('overflow', 'visible');
  };

  useEffect(() => {
    setUserClosed(false);
    if (!userClosed) {
      const isMenuExpanded = !isMobile && isHomePage;
      const isOverlayExpanded = isMobile && isHomePage;
      setExpanded(isMenuExpanded);
      setExpandedOverlay(isOverlayExpanded);
    }
  }, [isMobile, isHomePage, pathname, userClosed]);

  useEffect(() => {
    if (!isMobile && isHomePage && !userClosed) {
      setExpanded(!isHiddenMenu);
    }
  }, [isMobile, isHiddenMenu, isHomePage, userClosed]);

  useEffect(() => {
    if (!isHomePage) {
      setUserClosed(false);
    }
  }, [isHomePage]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    document.body.style.setProperty('overflow', 'visible');
  }, [pathname]);

  const onMenuButtonClick = () => {
    if (isMobile) {
      if (expanded) {
        document.body.style.setProperty('overflow', 'visible');
      } else {
        document.body.style.setProperty('overflow', 'hidden');
      }
      setExpanded((prev) => !prev);
    }
  };

  return (
    <HeaderMenuProvider initIsHovered={false}>
      <div className={cn(styles.root, className)}>
        <HeaderMenuButton
          className={styles.menu_toggle}
          onClick={onMenuButtonClick}
          expanded={expanded}
          isMobile={isMobile}
        />
        <HeaderMenu expanded={expanded} expandedOverlay={expandedOverlay} className={styles.menu} onClose={closeMenu} />
      </div>
    </HeaderMenuProvider>

  );
};
