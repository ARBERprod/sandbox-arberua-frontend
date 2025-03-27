import cn from 'classnames';
import styles from './HoverImagesCarousel.module.scss';
import { ImageType } from '@/shared/types/common';
import { Slide, Slider } from '@/shared/ui/Slider';
import { AppImage } from '@/shared/ui/AppImage';
import {
  useEffect, useRef, useState,
} from 'react';
import Swiper, { EffectFade, Pagination } from 'swiper';
import 'swiper/css/effect-fade';

interface HoverImagesCarouselProps {
  className?: string;
  pictures: ImageType[];
}

export const HoverImagesCarousel = ({
  className,
  pictures = [],
}: HoverImagesCarouselProps) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const [slider, setSlider] = useState<Swiper | null>(null);

  const slides: Slide[] = pictures.map((p, idx) => ({
    id: idx,
    slide: <AppImage unoptimized alt="" src={p} />,
  }));
  const slideTo = (index: number) => {
    if (slider) {
      slider.slideTo(index);
    }
  };

  useEffect(() => {
    if (!slider || !blockRef.current) return;
    const bullets = blockRef.current.querySelectorAll<HTMLSpanElement>('[data-bullet]');
    bullets.forEach((bullet) => {
      // eslint-disable-next-line no-param-reassign
      bullet.onmouseenter = (e) => {
        // @ts-ignore
        const index = e?.target?.dataset?.bullet;
        if (index) {
          slideTo(+index);
        }
      };
    });
    // eslint-disable-next-line
  }, [slider]);

  const calculateBulletWidth = () => `calc(100% / ${pictures.length})`;

  const calculateBulletLeftPosition = (bulletIndex: number) => `calc(${bulletIndex} * (100% / ${pictures.length}))`;
  return (
    <div ref={blockRef} className={cn(styles.root, className)}>
      <Slider
        onSwiper={setSlider}
        effect="fade"
        slides={slides}
        slidesPerView={1}
        modules={[Pagination, EffectFade]}
        className={styles.slider}
        slideClassName={styles.slide}
        pagination={{
          clickable: false,
          renderBullet(number, className) {
            return `
              <span data-bullet="${number}"
                    style="left: ${calculateBulletLeftPosition(number)}; width: ${calculateBulletWidth()}" 
                    class="${className} ${styles.bullet}"
              >
                <span class="${styles.runner}"></span>
              </span>`;
          },
        }}
      />
    </div>
  );
};
