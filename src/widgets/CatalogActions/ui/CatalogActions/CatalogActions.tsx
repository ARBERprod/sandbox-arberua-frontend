import { memo } from 'react';
import cn from 'classnames';
import { ProductFilter } from '@/features/ProductFilter';
import { GridViewSwitcher } from '@/shared/ui/GridViewSwitcher';
import { ProductSort } from '@/features/ProductSort';
import { FilterItem } from '@/entities/Filter';
import { CardView, SortOption } from '@/shared/types/common';
import { useEvent } from '@/shared/lib/hooks/useEvent';
import styles from './CatalogActions.module.scss';

interface CatalogActionsProps {
  basePath: string;
  filters: FilterItem[];
  view: CardView;
  onViewChange: (view: CardView) => void;
  sortOptions: SortOption[];
  filtersMode?: 'seo' | 'query';
  className?: string;
}

export const CatalogActions = memo(({
  className,
  filters,
  onViewChange,
  view,
  sortOptions,
  filtersMode = 'seo',
  basePath,
}: CatalogActionsProps) => {
  const viewChangeHandler = useEvent((view: CardView) => {
    onViewChange(view);
  });

  const showFilters = basePath && filters.length > 0;
  return (
    <div className={cn(styles.root, className)}>
      {showFilters
        ? (
          <ProductFilter
            filtersMode={filtersMode}
            basePath={basePath}
            filters={filters}
            className={styles.filterBtn}
          />
        ) : <div className={styles.filterBtn} />}
      <GridViewSwitcher className={styles.viewSwitcher} value={view} onChange={viewChangeHandler} />
      <ProductSort
        options={sortOptions}
        className={styles.sortBtn}
      />
    </div>
  );
});
