import {
  memo, useCallback, useId, useRef, useState,
} from 'react';
import cn from 'classnames';
import Swiper, { FreeMode, Navigation, Thumbs } from 'swiper';
import { Slider } from '@/shared/ui/Slider';
import { ImageType } from '@/shared/types/common';
import { useBodyOverflow } from '@/shared/lib/components/FloatingProvider';
import { AppImage } from '@/shared/ui/AppImage';
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery';
import { breakpoints } from '@/shared/config/breakpoints';
import { Svg } from '@/shared/ui/Svg';
import ArrowLeftIcon from '@/shared/assets/icons/chevron-l.svg';
import ArrowRightIcon from '@/shared/assets/icons/chevron-r.svg';
import CloseIcon from '@/shared/assets/icons/close.svg';
import { NoSSR } from '@/shared/lib/components/NoSSR';
import { NavigationOptions } from 'swiper/types';
import styles from './FullscreenThumbsSlider.module.scss';

interface FullscreenThumbsSliderProps {
  className?: string;
  images: ImageType[];
  onClose: () => void;
  isOpen: boolean;
  activeSlideIndex: number;
  onSlideChange?: (index: number) => void;

}

export const FullscreenThumbsSlider = memo(({
  isOpen,
  images,
  onClose,
  onSlideChange,
  activeSlideIndex,
  className,
}: FullscreenThumbsSliderProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<Swiper | null>(null);
  const [, setMainSlider] = useState<Swiper | null>(null);
  const id = useId();
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);
  const prevBtnId = useId();
  const nextBtnId = useId();
  const isDesktop = useMediaQuery(breakpoints.desktop);
  useBodyOverflow({
    unlockOnUnmount: true,
    condition: isOpen,
    elementId: id,
  });
  const mainSlides = images.map((image, index) => ({
    id: index,
    slide: (
      <div className={styles.mainSlide}>
        <AppImage unoptimized alt="slide" src={image} />
      </div>
    ),
  }));
  const slideChangeHandler = useCallback((swiper: Swiper) => {
    onSlideChange?.(swiper.realIndex);
  }, [onSlideChange]);

  const thumbSlides = images.map((image, index) => ({
    id: index,
    slide: (
      <div className={styles.thumbSlide}>
        <AppImage unoptimized alt="slide" src={image} />
        <div className={styles.backdrop} />
      </div>
    ),
  }));
  const showMainSlider = thumbsSwiper && !thumbsSwiper.destroyed;
  if (!isOpen) return null;
  return (
    <NoSSR>
      <div data-testid="FullscreenThumbsSlider" className={cn(styles.root, className)}>
        <div role="presentation" className={styles.backdrop} onClick={onClose} />
        <span data-testid="FullscreenThumbsSlider.activeSlide" className={styles.activeSlideSpan}>{activeSlideIndex}</span>
        <div className={styles.sliders}>
          <button className={styles.closeBtn} onClick={onClose}>
            <Svg Icon={CloseIcon} stroke="grey" width={14} height={14} />
          </button>
          <Slider
            slides={thumbSlides}
            slidesPerView="auto"
            direction={isDesktop ? 'vertical' : 'horizontal'}
            modules={[FreeMode, Navigation, Thumbs]}
            onSwiper={setThumbsSwiper}
            spaceBetween={isDesktop ? 16 : 8}
            initialSlide={activeSlideIndex}
            className={styles.thumbSlider}
            watchSlidesProgress
            onSlideChange={slideChangeHandler}
          />
          {
            showMainSlider
            && (
              <Slider
                slides={mainSlides}
                spaceBetween={10}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className={styles.mainSlider}
                initialSlide={activeSlideIndex}
                onSwiper={setMainSlider}
                onSlideChange={slideChangeHandler}
                loop
                navigation={{
                  nextEl: navigationNextRef.current,
                  prevEl: navigationPrevRef.current,
                }}
                onBeforeInit={(swiper) => {
                  (swiper.params.navigation! as NavigationOptions).prevEl = document.getElementById(prevBtnId);
                  (swiper.params.navigation! as NavigationOptions).nextEl = document.getElementById(nextBtnId);
                  swiper.slideTo(activeSlideIndex);
                }}
              >
                {(!isDesktop && images.length > 1) && (
                  <>
                    <button id={prevBtnId} className={cn(styles.nav, styles.navPrev)} ref={navigationPrevRef}>
                      <Svg width={10} height={20} Icon={ArrowLeftIcon} />
                    </button>
                    <button id={nextBtnId} className={cn(styles.nav, styles.navNext)} ref={navigationNextRef}>
                      <Svg width={10} height={20} Icon={ArrowRightIcon} />

                    </button>
                  </>
                )}
              </Slider>
            )
          }
          {(isDesktop && images.length > 1)
            && (
              <>
                <button id={prevBtnId} className={cn(styles.nav, styles.navPrev)} ref={navigationPrevRef}>
                  <Svg width={24} height={20} Icon={ArrowLeftIcon} />
                </button>
                <button id={nextBtnId} className={cn(styles.nav, styles.navNext)} ref={navigationNextRef}>
                  <Svg width={10} height={20} Icon={ArrowRightIcon} />
                </button>
              </>
            )}
        </div>
      </div>
    </NoSSR>
  );
});
