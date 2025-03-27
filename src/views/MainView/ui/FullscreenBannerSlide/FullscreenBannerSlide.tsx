import { memo } from 'react';
import { Loader } from '@/shared/ui/Loader';
import { AppImage } from '@/shared/ui/AppImage';
import cn from 'classnames';
import { BannerMediaType, ImageType } from '@/shared/types/common';
import styles from './FullscreenBannerSlide.module.scss';
import Link from 'next/link';
import { StaticImageData } from 'next/image';

interface FullscreenVideoSlideProps {
  className?: string;
  src?: ImageType | string | StaticImageData | null | File;
  srcMob?: ImageType | string | StaticImageData | null | File;
  srcTab?: ImageType | string | StaticImageData | null | File;
  type?: BannerMediaType;
  link?: string;
}

export const FullscreenBannerSlide = memo(({
  className, src, type, link, srcMob, srcTab,
}:FullscreenVideoSlideProps) => {
  if (!src) return null;
  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.loader_wrap}>
        <Loader className={styles.loader} />
      </div>
      {type === 'video'
    && (
      link ? (
        <Link href={link}>
          <video
            className={styles.media}
            autoPlay
            muted
            playsInline
            loop
            src={src as string}
          />
        </Link>
      ) : (
        <video
          className={styles.media}
          autoPlay
          muted
          playsInline
          loop
          src={src as string}
        />
      )
    )}
      {type === 'image'
    && (
      link ? (
        <Link href={link}>
          <AppImage unoptimized alt="Banner" src={src as ImageType} className={cn(styles.media, srcMob ? styles.mediaDesc : '')} />
          {srcTab && <AppImage unoptimized alt="Banner" src={srcTab as ImageType} className={cn(styles.media, styles.mediaTab)} />}
          {srcMob && <AppImage unoptimized alt="Banner" src={srcMob as ImageType} className={cn(styles.media, styles.mediaMob)} />}
        </Link>
      ) : (
        <>
          <AppImage unoptimized alt="Banner" src={src as ImageType} className={cn(styles.media, srcMob ? styles.mediaDesc : '')} />
          {srcTab && <AppImage unoptimized alt="Banner" src={srcTab as ImageType} className={cn(styles.media, styles.mediaTab)} />}
          {srcMob && <AppImage unoptimized alt="Banner" src={srcMob as ImageType} className={cn(styles.media, styles.mediaMob)} />}
        </>
      )
    )}
    </div>
  );
});
