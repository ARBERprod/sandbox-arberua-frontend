import { memo, ReactNode, useMemo } from 'react';
import cn from 'classnames';
import { Svg } from '@/shared/ui/Svg';
import ArrowRightIcon from '@/shared/assets/icons/arrow-right.svg';
import { CurrentMenuType, MenuLink, MenuLinkView } from '../../../model/types';
import { HeaderMenuItemWrap } from '../HeaderMenuItemWrap';
import { useTranslation } from 'react-i18next';
import styles from './HeaderMenuItem.module.scss';

interface HeaderMenuItemProps {
  className?: string,
  href?: string,
  children: ReactNode,
  type: MenuLinkView,
  marked?: boolean,
  targetMenu?: CurrentMenuType | false,
  nested?: MenuLink[] | false,
  isNested?: boolean,
  onClick?: (type: CurrentMenuType) => void,
  openNewPage?: boolean,
  color?: string,
  bold?: boolean,
  isHovered?: boolean,
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
}: HeaderMenuItemProps) => {
  const { t } = useTranslation();

  const nestedWithParent = useMemo(() => {
    if (!href || !children || typeof children !== 'string') return nested;

    return [
      {
        href,
        title: t('menu.allProducts'),
        children: false,
        type: 'link',
      },
      ...(Array.isArray(nested) ? nested : []),
    ] as MenuLink[];
  }, [t, nested, href, children]);

  return (
    <li className={cn(styles.root, className)}>
      <HeaderMenuItemWrap
        className={cn(styles.link, {
          [styles.link_nested]: isNested,
          [styles.promotions]: href?.includes('promotions'),
        })}
        href={href}
        type={type}
        targetMenu={targetMenu}
        nested={nestedWithParent}
        onClick={onClick}
        openNewPage={openNewPage}
        color={color}
        bold={bold}
      >
        <span
          className={cn(styles.link_text, {
            [styles.mark]: marked,
            [styles.link_text_hovered]: !isHovered,
          })}
        >
          {children}
        </span>
        {type === 'button' && (
          <Svg
            Icon={ArrowRightIcon}
            className={cn(styles.icon, {
              [styles.icon_hovered]: !isHovered,
            })}
            height="14"
          />
        )}
      </HeaderMenuItemWrap>
    </li>
  );
});
