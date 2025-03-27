import { memo } from 'react';
import cn from 'classnames';
import { Slide } from '@/shared/ui/Slider';
import styles from './SubcategoryLabelsGrid.module.scss';

interface SubcategoryLabelsGridProps {
  className?: string;
  slides: Slide[];
}

export const SubcategoryLabelsGrid = memo(({
  className,
  slides,
}:SubcategoryLabelsGridProps) => (
  <div className={cn(styles.root, className)}>
    {!!slides?.length && (
      <ul className={styles.list}>
        {slides.map((slide) => (
          <li
            className={styles.item}
            key={slide.id}
          >
            {slide.slide}
          </li>
        ))}
      </ul>
    )}
  </div>
));
