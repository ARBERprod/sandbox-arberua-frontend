import { CSSProperties, memo } from 'react';
import cn from 'classnames';
import styles from './Skeleton.module.scss';

type Unit = 'px' | '%' | 'rem' | 'em';

interface SkeletonProps {
  className?: string;
  width: number | `${number}${Unit}`;
  height: number | `${number}${Unit}`;
  radius: number | `${number}${Unit}`;
}

export const Skeleton = memo(({
  className,
  height,
  radius = 50,
  width = '100%',
}: SkeletonProps) => {
  const style: CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius: typeof radius === 'number' ? `${radius}px` : radius,
  };
  return (
    <div style={style} className={cn(styles.root, className)} />
  );
});
