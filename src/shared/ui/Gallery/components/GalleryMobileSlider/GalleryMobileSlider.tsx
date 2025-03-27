import { memo, useMemo } from 'react';
import { Pagination } from 'swiper';
import cn from 'classnames';
import { Slide, Slider } from '@/shared/ui/Slider';
import { AppImage } from '@/shared/ui/AppImage';
import { useGallery } from '../../lib/useGallery';
import styles from './GalleryMobileSlider.module.scss';

interface GalleryMobileSliderProps {
  className?: string;
}

export const GalleryMobileSlider = memo(({ className }:GalleryMobileSliderProps) => {
  const { images, openGallery } = useGallery();
  const slides: Slide[] = images.map((image, index) => ({
    id: index,
    slide: (
      <button onClick={() => openGallery(index)} className={styles.imageWrap}>
        <AppImage unoptimized alt="image" src={image} />
      </button>
    ),
  }));

  const pagination = useMemo(() => ({
    clickable: true,
    renderBullet(index: number, className: string) {
      return `<span class="${className}"></span>`;
    },
  }), []);

  return (
    <Slider
      slides={slides}
      className={cn(styles.root, className)}
      modules={[Pagination]}
      pagination={slides.length > 1 ? pagination : undefined}
      slidesPerView={1}
      spaceBetween={16}
    />
  );
});
