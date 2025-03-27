import { memo } from 'react';
import cn from 'classnames';
import { Typography } from '@/shared/ui/Typography';
import { Category } from '../../model/types';
import styles from './CategoryCircle.module.scss';
import { AppImage } from '@/shared/ui/AppImage';

interface CategoryCircleProps {
  className?: string;
  category: Category;
  onClick?: (category: Category) => void;
}

export const CategoryCircle = memo(({
  className,
  category,
  onClick,
}:CategoryCircleProps) => {
  const clickHandler = (category: Category) => {
    onClick?.(category);
  };

  return (
    <div
      className={cn(styles.root, className)}
      onClick={() => clickHandler(category)}
      role="presentation"
    >
      <div className={styles.img_wrap}>
        <AppImage className={styles.img} src={category?.picture || null} alt="" unoptimized />
      </div>
      <div className={styles.title_wrap}>
        <Typography className={styles.title} color="white" variant="body-2">
          {category?.title}
        </Typography>
      </div>
    </div>
  );
});
