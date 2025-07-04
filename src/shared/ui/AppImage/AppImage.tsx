import {
  memo, ReactNode, useState, useEffect,
} from 'react';
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
  const [tryWebp, setTryWebp] = useState(false);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    setError(false);
    if ((!width || !height) && src && typeof src === 'string') {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
      };
      img.onerror = () => {
        setError(true);
      };
    }
  }, [src, width, height]);

  useEffect(() => {
    if (loaded) {
      setTryWebp(true);
    }
  }, [loaded]);

  const convertSrc = (source: string) => {
    // @ts-ignore
    if (source.startsWith(process.env.NEXT_PUBLIC_API_URL_BASE)) {
      // @ts-ignore
      return source.replace(process.env.NEXT_PUBLIC_API_URL_BASE, process.env.NEXT_PUBLIC_IMG_URL);
    }
    return source;
  };

  const processedSrc = typeof src === 'string' ? convertSrc(src) : src;

  const getWebpSrc = (url: string) => {
    if (!url) return '';
    return url.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  };

  const webpSrc = typeof processedSrc === 'string' ? getWebpSrc(processedSrc) : undefined;

  const widthRender = dimensions?.width || width;
  const heightRender = dimensions?.height || height;

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

  const srcToUse = (() => {
    if (!processedSrc || error) return fallbackImage;
    if (tryWebp && typeof processedSrc === 'string') return getWebpSrc(processedSrc);
    return processedSrc;
  })();

  if (lazy) {
    return (
      <div className={cn(styles.root, { [styles.loaded]: loaded }, className)}>
        <Image
          src={srcToUse}
          alt={alt}
          width={widthRender}
          height={heightRender}
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
      src={srcToUse}
      alt={alt}
      width={widthRender}
      height={heightRender}
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
