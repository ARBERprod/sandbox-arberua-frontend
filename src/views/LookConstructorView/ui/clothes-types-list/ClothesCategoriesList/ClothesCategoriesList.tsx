import { memo } from 'react';
import cn from 'classnames';
import { NoSSR } from '@/shared/lib/components/NoSSR';
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery';
import { breakpoints } from '@/shared/config/breakpoints';
import styles from './ClothesCategoriesList.module.scss';
import { ClothesCategoriesGrid } from '../ClothesCategoriesGrid';
import { ClothesCategoriesSlider } from '../ClothesCategoriesSlider';

interface ClothesTypesListProps {
  className?: string;
}

export const ClothesCategoriesList = memo(({ className }:ClothesTypesListProps) => {
  const isDesktop = useMediaQuery(breakpoints.desktop);
  return (
    <NoSSR>
      <div className={cn(styles.root, className)}>
        {isDesktop ? <ClothesCategoriesGrid /> : <ClothesCategoriesSlider />}
      </div>
    </NoSSR>
  );
});
