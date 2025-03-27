import { memo } from 'react';
import cn from 'classnames';
import { Slide, Slider } from '@/shared/ui/Slider';
import { Pagination, Autoplay } from 'swiper';
import { ImageType } from '@/shared/types/common';
import { AppImage } from '@/shared/ui/AppImage';
import styles from './FullscreenImageSlider.module.scss';

interface FullscreenImageSliderProps {
  className?: string;
  items: ImageType[];
}

export const FullscreenImageSlider = memo(({
  className,
  items,
}: FullscreenImageSliderProps) => {
  const slidesList: Slide[] = items.map((item, index) => ({
    id: index,
    slide: (
      <div className={styles.slide_inner}>
        <AppImage
          unoptimized
          alt="title"
          src={item}
          className={styles.image}
        />
      </div>
    ),
  }));

  return (
    <div className={cn(styles.root, className)}>
      <Slider
        className={styles?.slider}
        onBeforeInit={() => {
        }}
        spaceBetween={0}
        grabCursor
        slides={slidesList}
        slideClassName={styles?.slide}
        slidesPerView="auto"
        loop
        pagination={{
          clickable: true,
          renderBullet(_, className) {
            return `<span class="${className} ${styles.bullet}"></span>`;
          },
        }}
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 10000,
          disableOnInteraction: true,
        }}
      />
    </div>
  );
});
