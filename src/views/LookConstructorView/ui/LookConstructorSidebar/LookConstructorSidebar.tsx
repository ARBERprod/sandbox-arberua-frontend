import { FC, memo } from 'react';
import { useSelector } from 'react-redux';
import { LookBuilderSidebar } from '@/widgets/LookBuilder';
import { lookConstructorSelectors } from '../../model/selectors/lookConstructorSelectors';
import { SideBarView } from '../../model/types/LookConstructorSchema';
import { ClothesList } from '../clothes-list/ClothesList';
import { ClothesCategoriesList } from '../clothes-types-list/ClothesCategoriesList';

const sidebarViewsMap: Record<SideBarView, FC> = {
  [SideBarView.CLOTHES_TYPES_LIST]: ClothesCategoriesList,
  [SideBarView.CLOTHES_LIST]: ClothesList,
};

interface LookConstructorSidebarProps {
  className?: string;
}

export const LookConstructorSidebar = memo(({ className }:LookConstructorSidebarProps) => {
  const activeView = useSelector(lookConstructorSelectors.getActiveSidebarView);
  const CurrentView = sidebarViewsMap[activeView];
  return (
    <LookBuilderSidebar className={className}>
      <CurrentView />
    </LookBuilderSidebar>
  );
});
