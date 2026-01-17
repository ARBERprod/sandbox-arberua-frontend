import {
  memo, useCallback, useId, useRef, useState, MouseEvent,
} from 'react';
import cn from 'classnames';
import Swiper, {
  FreeMode, Navigation, Thumbs, Zoom,
} from 'swiper';
import { Slider } from '@/shared/ui/Slider';
import { GalleryImage } from '@/shared/types/common';
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
  images: GalleryImage[];
  onClose: () => void;
  isOpen: boolean;
  activeSlideIndex: number;
  onSlideChange?: (index: number) => void;
}

// Custom zoomable image component for desktop hover zoom
interface ZoomableImageProps {
  src: string;
  zoomSrc?: string;
  alt?: string;
  zoomScale?: number;
}

const ZoomableImage = memo(({
  src,
  zoomSrc,
  alt = 'image',
  zoomScale = 2,
}: ZoomableImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [transformOrigin, setTransformOrigin] = useState('center center');

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setTransformOrigin(`${x}% ${y}%`);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsZoomed(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsZoomed(false);
    setTransformOrigin('center center');
  }, []);

  return (
    <div
      ref={containerRef}
      className={styles.zoomableContainer}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={isZoomed ? (zoomSrc || src) : src}
        alt={alt}
        className={styles.zoomableImage}
        style={{
          transform: isZoomed ? `scale(${zoomScale})` : 'scale(1)',
          transformOrigin,
        }}
      />
    </div>
  );
});

export const FullscreenThumbsSlider = memo(({
  isOpen,
  images,
  onClose,
  onSlideChange,
  activeSlideIndex,
  className,
}: FullscreenThumbsSliderProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<Swiper | null>(null);
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
        {isDesktop ? (
          <ZoomableImage
            src={image.cropped as string}
            zoomSrc={image.original as string || image.cropped as string}
            alt="slide"
            zoomScale={2.7}
          />
        ) : (
          <div className="swiper-zoom-container">
            <AppImage unoptimized alt="slide" src={image.original || image.cropped} />
          </div>
        )}
      </div>
    ),
  }));
  const slideChangeHandler = useCallback((swiper: Swiper) => {
    onSlideChange?.(swiper.realIndex);
  }, [onSlideChange]);

  const handleZoomChange = useCallback((swiper: Swiper, scale: number) => {
    // Disable swiping when zoomed in to allow panning (mobile only)
    swiper.allowSlideNext = scale <= 1;
    swiper.allowSlidePrev = scale <= 1;
  }, []);

  const thumbSlides = images.map((image, index) => ({
    id: index,
    slide: (
      <div className={styles.thumbSlide}>
        <AppImage unoptimized alt="slide" src={image.cropped} />
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
                modules={[FreeMode, Navigation, Thumbs, Zoom]}
                zoom={{ maxRatio: 3, minRatio: 1 }}
                className={styles.mainSlider}
                initialSlide={activeSlideIndex}
                onSlideChange={slideChangeHandler}
                onZoomChange={handleZoomChange}
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
