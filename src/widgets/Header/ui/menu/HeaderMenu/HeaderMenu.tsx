import { useState, useCallback, FC } from 'react';

import cn from 'classnames';
import { Container } from '@/shared/ui/Container';
import { MenuView, CurrentMenuType } from '../../../model/types';
import styles from './HeaderMenu.module.scss';
import { HeaderMenuMain } from '../HeaderMenuMain';
import { HeaderMenuCatalog } from '../HeaderMenuCatalog';
import { HeaderMenuInfo } from '../HeaderMenuInfo';
import { HeaderMenuLocale } from '../HeaderMenuLocale';
import { HeaderMenuSocials } from '../HeaderMenuSocials';
import { useHeaderMenu } from '../HeaderMenuProvider';

interface HeaderMenuProps {
  className?: string;
  expanded?: boolean;
  expandedOverlay?: boolean;
}

const menuViewMap: Record<MenuView, FC<{onClick?: (type: CurrentMenuType) => void; isHovered?: boolean;}>> = {
  [MenuView.INFO]: HeaderMenuInfo,
  [MenuView.MAIN]: HeaderMenuMain,
  [MenuView.CATALOG]: HeaderMenuCatalog,
};

export const HeaderMenu = ({
  className,
  expanded,
  expandedOverlay,
}:HeaderMenuProps) => {
  const [currentMenu, setCurrentMenu] = useState<CurrentMenuType>(MenuView.MAIN);
  const { setIsHoveredHandler, setIsNotHoveredHandler, isHovered } = useHeaderMenu();

  const setCurrentMenuHandler = useCallback((type: CurrentMenuType) => {
    setCurrentMenu(type);
  }, []);

  const expandedClassName = expanded ? 'expanded' : '';
  const expandedOverlayClassName = expandedOverlay ? 'expanded_overlay' : '';
  const CurrentMenu = menuViewMap[currentMenu];

  return (
    <div
      onMouseEnter={setIsHoveredHandler}
      onMouseLeave={setIsNotHoveredHandler}
      className={cn(styles.root, styles[expandedClassName], styles[expandedOverlayClassName], className)}
    >
      <div className={cn(styles.inner, styles[expandedOverlayClassName])}>
        <Container className={styles.container}>
          <CurrentMenu onClick={setCurrentMenuHandler} isHovered={isHovered} />
          <HeaderMenuLocale className={styles.locale} expanded={expanded} />
          <HeaderMenuSocials className={styles.socials} />
        </Container>
      </div>
    </div>
  );
};
