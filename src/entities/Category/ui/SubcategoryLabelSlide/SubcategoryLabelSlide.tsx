import { memo } from 'react';
import cn from 'classnames';
import { Button } from '@/shared/ui/Button';
import { Category } from '../../model/types';
import styles from './SubcategoryLabelSlide.module.scss';

interface SubcategoryLabelSlideProps {
  className?: string;
  category: Category;
  onClick: (subcategory: Category) => void;
}

export const SubcategoryLabelSlide = memo(({
  className,
  category,
  onClick,
}:SubcategoryLabelSlideProps) => {
  const clickHandler = (subcategory: Category) => {
    onClick?.(subcategory);
  };

  return (
    <Button
      className={cn(styles.root, className)}
      size="xsmall"
      variant="rounded-label"
      color="transparent-bg"
      onClick={() => clickHandler(category)}
    >
      {category?.title}
    </Button>
  );
});
