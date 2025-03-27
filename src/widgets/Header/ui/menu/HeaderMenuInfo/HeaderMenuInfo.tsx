import { memo, useMemo } from 'react';
import cn from 'classnames';
import BackIcon from '@/shared/assets/icons/arrow-left-2.svg';
import { Svg } from '@/shared/ui/Svg';
import { useTranslation } from 'next-i18next';
import { HeaderMenuListItems } from '../HeaderMenuListItems';
import { CurrentMenuType, MenuView } from '../../../model/types';
import styles from './HeaderMenuInfo.module.scss';
import { headerMenuInfoMocked } from '../../../constants/headerMenu';
import { useGetMenusQuery } from '@/entities/Menu';
import { mapPageItemToMenuItem } from '../../../lib/mapPageItemToMenuItem';

interface HeaderMenuInfoProps {
  className?: string;
  onClick?: (type: CurrentMenuType) => void;
  isHovered?: boolean;
}

export const HeaderMenuInfo = memo(({ className, onClick, isHovered }:HeaderMenuInfoProps) => {
  const { t } = useTranslation();
  const { data } = useGetMenusQuery();
  const buttonClickHandler = () => {
    onClick?.(MenuView.MAIN);
  };
  const menuItems = useMemo(() => {
    const serverPages = data ? data.pages.map(mapPageItemToMenuItem).filter((item) => !item?.url?.includes('pytania-i-vodpovidi')) : [];
    return [...headerMenuInfoMocked(t), ...serverPages];
  }, [data, t]);
  return (
    <div className={cn(styles.root, className)}>
      <button className={styles.button} onClick={buttonClickHandler}>
        <Svg Icon={BackIcon} width="24" height="24" stroke={isHovered ? 'black-light-2' : '#fff'} />
      </button>
      <HeaderMenuListItems items={menuItems} onClick={onClick} />
    </div>
  );
});
