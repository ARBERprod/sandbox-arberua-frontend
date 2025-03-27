import { memo, ReactNode, useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { ImageType } from '@/shared/types/common';
import fallbackImage from '@/shared/assets/images/image-placeholder.jpg';
import cn from 'classnames';
import styles from './AppImage.module.scss';

interface AppImageProps extends Omit<ImageProps, 'alt' | 'src' | 'lazy'> {
  alt: string;
  src?: ImageType | null;
  className?: string;
  fallback?: ReactNode;
  onLoad?: () => void;
  lazy?: boolean;
}

export const AppImage = memo(({
  className, alt, src, fallback, width = 0, height = 0, onError, lazy, ...imageProps
}:AppImageProps) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (!src || error) {
    if (!fallback) {
      return (
        <Image
          src={fallbackImage}
          alt={alt}
          width={width}
          height={height}
          className={className}
          {...imageProps}
        />
      );
    }
    return <div className={className}>{fallback}</div>;
  }

  if (lazy) {
    return (
      <div className={cn(styles.root, { [styles.loaded]: loaded }, className)}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={cn(styles.image, className)}
          onError={(event) => {
            setError(true);
            onError?.(event);
          }}
          onLoad={() => {
            setLoaded(true);
          }}
          {...imageProps}
        />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={(event) => {
        setError(true);
        onError?.(event);
      }}
      onLoad={() => {
        setLoaded(true);
      }}
      {...imageProps}
    />
  );
});
