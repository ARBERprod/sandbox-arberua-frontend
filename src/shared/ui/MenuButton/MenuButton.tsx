import cn from 'classnames';
import HamburgerIcon from '@/shared/assets/icons/hamburger.svg';
import { Svg } from '@/shared/ui/Svg';
import { SvgType } from '@/shared/types/common';
import styles from './MenuButton.module.scss';
import { useHeaderMenu } from '@/widgets/Header/ui/menu/HeaderMenuProvider';

export interface MenuButtonProps {
  className?: string;
  onClick?: () => void;
  Icon?: SvgType;
  expanded?: boolean;
}

export const MenuButton = ({
  className, onClick, expanded, Icon = HamburgerIcon, ...rest
}: MenuButtonProps) => {
  const { setIsHoveredHandler, setIsNotHoveredHandler } = useHeaderMenu();

  return (
    <>
      <button
        onMouseEnter={setIsHoveredHandler}
        onMouseLeave={setIsNotHoveredHandler}
        className={cn(styles.root, className)}
        onClick={onClick}
      >
        <Svg Icon={Icon} width="24" height="24" stroke="black-light-2" {...rest} />
      </button>
      <button
        onMouseEnter={setIsHoveredHandler}
        onMouseLeave={setIsNotHoveredHandler}
        className={cn(
          styles.menuOverlay,
          { [styles.overlay]: expanded },
        )}
        onClick={onClick}
      />
    </>
  );
};
