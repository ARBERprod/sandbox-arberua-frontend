import {
  memo, useEffect, useMemo, useState,
} from 'react';
import cn from 'classnames';
import { ManWomanSwitcherButtons } from '@/shared/ui/ManWomanSwitcherButtons';
import BackIcon from '@/shared/assets/icons/arrow-left-2.svg';
import { Svg } from '@/shared/ui/Svg';
import { useGetMenusQuery } from '@/entities/Menu';
import { Loader } from '@/shared/ui/Loader';
import { MenuItem } from '@/entities/Menu/api/types';
import { HeaderMenuListItems } from '../HeaderMenuListItems';
import { CurrentMenuType, MenuLink, MenuView } from '../../../model/types';
import styles from './HeaderMenuCatalog.module.scss';

interface HeaderMenuCatalogProps {
  className?: string;
  onClick?: (type: CurrentMenuType) => void;
  isHovered?: boolean;
}

export const HeaderMenuCatalog = memo(({ className, onClick, isHovered }:HeaderMenuCatalogProps) => {
  const [currentCatalogItems, setCurrentCatalogItems] = useState<MenuLink[]>([]);

  const { data, isLoading, isError } = useGetMenusQuery();
  const [chosenTab, setChosenTab] = useState('');

  useEffect(() => {
    if (!data || data.menus.length === 0) return;
    if (chosenTab) return;

    setChosenTab(data.menus[1].slug);
  }, [chosenTab, data]);

  useEffect(() => {
    setCurrentCatalogItems(() => {
      const currentCategory = data && !isLoading && !isError && data.menus.length > 0
       && data.menus.find((menu: MenuItem) => menu.slug === chosenTab);

      const certificates = data && !isLoading && !isError && data.menus.find((menu: MenuItem) => menu.slug === 'certificates');

      if (currentCategory && currentCategory?.children) {
        return certificates ? [...currentCategory.children, certificates] : currentCategory.children;
      }
      return [];
    });
  }, [chosenTab, data, isLoading, isError]);

  const buttonClickHandler = () => {
    onClick?.(MenuView.MAIN);
  };

  const tabs = useMemo(() => {
    if (!data) return [];
    if (data.menus.length === 0) return [];
    const [man, woman] = data.menus;
    return [
      {
        title: woman.title,
        slug: woman.slug,
      },
      {
        title: man.title,
        slug: man.slug,
      },
    ];
  }, [data]);

  const renderContent = () => {
    if (isLoading) return <Loader className={styles.loader} />;
    if (isError || !data) return null;

    return (
      <>
        <ManWomanSwitcherButtons tabs={tabs} chosenTab={chosenTab} setChosenTab={setChosenTab} />
        <HeaderMenuListItems
          className={styles.list}
          items={currentCatalogItems}
          onClick={onClick}
        />
      </>
    );
  };

  return (
    <div className={cn(styles.root, className)}>
      <button className={cn(styles.button, className)} onClick={buttonClickHandler}>
        <Svg Icon={BackIcon} width="24" height="24" stroke={isHovered ? 'black-light-2' : '#fff'} />
      </button>
      {renderContent()}
    </div>
  );
});
