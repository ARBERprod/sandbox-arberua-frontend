import { CSSProperties, memo, useCallback } from 'react';
import cn from 'classnames';
import { Rating } from 'react-simple-star-rating';
import styles from './StarRating.module.scss';

type StarSize = 'normal' | 'large';

type StarSettings = {
  icon: number;
  wrap: number;
  emptyColor: string;
  strokeWidth: number;
  gap: number;
}

export interface StarRatingProps {
  value: number;
  onClick?: (value: number) => void;
  size?: StarSize;
  readonly?: boolean;
  className?: string;
  iconsCount?: number;
}

const starSettingsMap: Record<StarSize, StarSettings> = {
  normal: {
    icon: 12,
    wrap: 15,
    emptyColor: '#A1A1A1',
    strokeWidth: 0,
    gap: 2,
  },
  large: {
    icon: 28,
    wrap: 28,
    emptyColor: 'transparent',
    strokeWidth: 1,
    gap: 12,
  },
};

export const StarRating = memo(({
  className,
  onClick,
  value,
  size = 'normal',
  iconsCount = 5,
  readonly,
}: StarRatingProps) => {
  const clickHandler = useCallback((value: number) => {
    onClick?.(value);
  }, [onClick]);
  return (
    <div
      style={{
        '--height': `${starSettingsMap[size].wrap}px`,
        '--gap': `${starSettingsMap[size].gap}px`,
      } as CSSProperties}
      className={cn(styles.root, className)}
      data-testid="StarRating"
    >
      <Rating
        initialValue={value}
        onClick={clickHandler}
        size={starSettingsMap[size].icon}
        showTooltip={false}
        fillColor="#0E0E0E"
        SVGstrokeColor="#0E0E0E"
        SVGstorkeWidth={starSettingsMap[size].strokeWidth}
        emptyColor={starSettingsMap[size].emptyColor}
        className={styles.rating}
        iconsCount={iconsCount}
        readonly={readonly}
      />
    </div>
  );
});
