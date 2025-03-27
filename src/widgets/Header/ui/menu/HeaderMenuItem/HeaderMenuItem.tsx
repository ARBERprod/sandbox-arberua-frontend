import { memo, ReactNode } from 'react';
import cn from 'classnames';
import { Svg } from '@/shared/ui/Svg';
import ArrowRightIcon from '@/shared/assets/icons/arrow-right.svg';
import { CurrentMenuType, MenuLink, MenuLinkView } from '../../../model/types';
import { HeaderMenuItemWrap } from '../HeaderMenuItemWrap';
import styles from './HeaderMenuItem.module.scss';

interface HeaderMenuItemProps {
  className?: string;
  href?: string;
  children: ReactNode;
  type: MenuLinkView;
  marked?: boolean;
  targetMenu?: CurrentMenuType | false;
  nested?: MenuLink[] | false;
  isNested?: boolean;
  onClick?: (type: CurrentMenuType) => void;
  openNewPage?: boolean;
  color?: string;
  bold?: boolean;
  isHovered?: boolean;
}

export const HeaderMenuItem = memo(({
  className,
  href = '',
  children,
  type = 'link',
  marked = false,
  targetMenu,
  nested,
  isNested,
  onClick,
  openNewPage,
  color,
  bold,
  isHovered,
}:HeaderMenuItemProps) => (
  <li className={cn(styles.root, className)}>
    <HeaderMenuItemWrap
      className={cn(styles.link, {
        [styles.link_nested]: isNested,
      })}
      href={href}
      type={type}
      targetMenu={targetMenu}
      nested={nested}
      onClick={onClick}
      openNewPage={openNewPage}
      color={color}
      bold={bold}
    >
      <span className={cn(styles.link_text, {
        [styles.mark]: marked,
        [styles.link_text_hovered]: !isHovered,
      })}
      >
        {children}
      </span>
      {type === 'button' && <Svg Icon={ArrowRightIcon} className={cn(styles.icon, { [styles.icon_hovered]: !isHovered })} height="14" />}
    </HeaderMenuItemWrap>
  </li>
));
