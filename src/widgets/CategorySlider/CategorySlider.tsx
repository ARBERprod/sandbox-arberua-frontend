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

export interface CategorySliderProps {
  className?: string;
  categories: Category[];
  category: Category | null;
  isSubcategory: boolean;
  onCategoryChange: (category: Category) => void;
}

export const CategorySlider = memo(({
  className,
  categories = [],
  onCategoryChange,
  category,
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
          <Typography variant="title-2" color="black" className={styles.title_wrap}>
            {category?.title}
          </Typography>
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
