import { memo } from 'react';
import cn from 'classnames';
import { ImageType } from '@/shared/types/common';
import { AppImage } from '@/shared/ui/AppImage';
import { Typography } from '@/shared/ui/Typography';
import styles from './ClothesItem.module.scss';

interface ClothesItemProps {
  className?: string;
  active?: boolean;
  image: ImageType;
  onClick?: () => void;
  text?: string;
  size: 'md' | 'sm' | 'vertical';
  rounded?: boolean;
}

export const ClothesItem = memo(({
  className,
  image,
  size = 'md',
  text,
  active,
  onClick,
  rounded = false,
}: ClothesItemProps) => {
  const RootComponent = onClick ? 'button' : 'div';
  return (
    <RootComponent
      onClick={onClick}
      className={cn(
        styles.root,
        {
          [styles.active]: active,
          [styles.withText]: Boolean(text),
          [styles.rounded]: rounded,
        },
        styles[size],
        className,
      )}
    >
      <span className={styles.imageWrap}>
        <AppImage unoptimized alt="clothes" src={image} className={styles.image} />
      </span>
      {text && <Typography variant="body-3" className={styles.title} as="span">{text}</Typography>}
    </RootComponent>
  );
});
