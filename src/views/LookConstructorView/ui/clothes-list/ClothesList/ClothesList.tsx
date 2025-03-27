import { memo } from 'react';
import cn from 'classnames';
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery';
import { breakpoints } from '@/shared/config/breakpoints';
import { NoSSR } from '@/shared/lib/components/NoSSR';
import styles from './ClothesList.module.scss';
import { ClothesGrid } from '../ClothesGrid';
import { ClothesSliderList } from '../ClothesSliderList';

interface ClothesListProps {
  className?: string;
}

export const ClothesList = memo(({ className }:ClothesListProps) => {
  const isDesktop = useMediaQuery(breakpoints.desktop);
  return (
    <NoSSR>
      <div className={cn(styles.root, className)}>
        {isDesktop ? <ClothesGrid /> : <ClothesSliderList />}
      </div>
    </NoSSR>
  );
});
