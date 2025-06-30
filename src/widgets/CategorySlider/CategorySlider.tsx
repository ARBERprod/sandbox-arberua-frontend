import {
  memo, useMemo, useCallback,
} from 'react';
import cn from 'classnames';
import { Slide } from '@/shared/ui/Slider';
import {
  Category, SubcategoryLabels, SubcategoryLabelSlide,
} from '@/entities/Category';
import { Typography } from '@/shared/ui/Typography';
import styles from './CategorySlider.module.scss';
import { CardView } from '@/shared/types/common';
import { GridViewSwitcher } from '@/shared/ui/GridViewSwitcher';
import { FilterItem } from '@/entities/Filter';

export interface CategorySliderProps {
  basePath: string;
  className?: string,
  categories: Category[],
  category: Category | null,
  filters: FilterItem[];
  isSubcategory: boolean,
  onCategoryChange: (category: Category) => void,
  onViewChange: (view: CardView) => void,
  view: CardView,
}

export const CategorySlider = memo(({
  className,
  categories = [],
  filters,
  onCategoryChange,
  category,
  onViewChange,
  view,
  basePath,
  isSubcategory = false,
}: CategorySliderProps) => {
  const clickCategoryHandler = useCallback((category: Category) => {
    onCategoryChange(category);
  }, [onCategoryChange]);

  const slidesCategory: Slide[] = useMemo(() => {
    if (categories.length === 0 && filters.length > 0) {
      const categoryFilter = filters[0];

      return categoryFilter.values.map((value) => {
        const url = `${basePath}/${categoryFilter.slug}=${value.slug}`;

        return {
          id: value.slug,
          slide: (
            <SubcategoryLabelSlide
              category={{
                id: value.slug,
                title: value.title,
                url,
              }}
              onClick={() => onCategoryChange({
                id: value.slug,
                title: value.title,
                url,
              })}
            />
          ),
        };
      });
    }

    return categories.map((category) => ({
      id: category.url,
      slide: (
        <SubcategoryLabelSlide
          category={category}
          onClick={clickCategoryHandler}
        />
      ),
    }));
  }, [categories, filters, basePath, onCategoryChange, clickCategoryHandler]);

  return (
    <div data-testid="CategorySlider" className={cn(styles.root, className)}>
      <div className={styles.header}>
        <div className={styles.header_top}>
          <Typography variant="title-1" color="black" className={styles.title_wrap}>
            {category?.title}
          </Typography>
          <GridViewSwitcher className={styles.viewSwitcher} value={view} onChange={onViewChange}/>
        </div>
      </div>
      {isSubcategory ? (
        <SubcategoryLabels
          slides={slidesCategory}
        />
      ) : (
        <SubcategoryLabels
          slides={slidesCategory}
          className={styles.slider}
        />
      )}
    </div>
  );
});
