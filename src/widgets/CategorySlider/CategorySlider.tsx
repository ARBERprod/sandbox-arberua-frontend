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

export interface CategorySliderProps {
  className?: string;
  categories: Category[];
  category: Category | null;
  isSubcategory: boolean;
  onCategoryChange: (category: Category) => void;
  onViewChange: (view: CardView) => void;
  view: CardView;
}

export const CategorySlider = memo(({
  className,
  categories = [],
  onCategoryChange,
  category,
  onViewChange,
  view,
  isSubcategory = false,
}: CategorySliderProps) => {
  const clickCategoryHandler = useCallback((category: Category) => {
    onCategoryChange(category);
  }, [onCategoryChange]);

  const slidesCategory: Slide[] = useMemo(() => categories.map((category) => {
    if (!isSubcategory) {
      return {
        id: category.url,
        slide: (
          <SubcategoryLabelSlide
            category={category}
            onClick={clickCategoryHandler}
          />),
      };
    }
    return {
      id: category.url,
      slide: (
        <SubcategoryLabelSlide
          category={category}
          onClick={clickCategoryHandler}
        />),
    };
  }), [categories, clickCategoryHandler, isSubcategory]);

  return (
    <div data-testid="CategorySlider" className={cn(styles.root, className)}>
      <div className={styles.header}>
        <div className={styles.header_top}>
          <Typography variant="title-1" color="black" className={styles.title_wrap}>
            {category?.title}
          </Typography>
          <GridViewSwitcher className={styles.viewSwitcher} value={view} onChange={onViewChange} />
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
