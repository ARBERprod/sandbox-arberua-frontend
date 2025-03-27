import cn from 'classnames';
import { useState, useEffect } from 'react';
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
  const isHiddenMenu = useHiddenMenu();

  useEffect(() => {
    const isMenuExpanded = !isMobile && isHomePage;
    const isOverlayExpanded = isMobile && isHomePage;
    setExpanded(isMenuExpanded);
    setExpandedOverlay(isOverlayExpanded);
  }, [isMobile, isHomePage]);

  useEffect(() => {
    if (!isMobile && isHomePage) {
      setExpanded(!isHiddenMenu);
    }
  }, [isMobile, isHiddenMenu, isHomePage]);

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
        <HeaderMenu expanded={expanded} expandedOverlay={expandedOverlay} className={styles.menu} />
      </div>
    </HeaderMenuProvider>

  );
};
