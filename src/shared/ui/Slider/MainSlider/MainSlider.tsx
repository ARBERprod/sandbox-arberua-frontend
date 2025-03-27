import { memo, useId, useRef } from 'react';
import { Slide, Slider } from '@/shared/ui/Slider';
import { NavigationOptions } from 'swiper/types';
import { Navigation, Scrollbar } from 'swiper';
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery';
import { breakpoints } from '@/shared/config/breakpoints';
import cn from 'classnames';
import ChevronRightIcon from '@/shared/assets/icons/slider-chevron-r.svg';
import ChevronLeftIcon from '@/shared/assets/icons/slider-chevron-l.svg';
import { Svg } from '@/shared/ui/Svg';
import styles from './MainSlider.module.scss';

interface MainSliderProps {
  className?: string;
  slides: Slide[];
  spaceBetween?: number;
  slidesPerView?: number | 'auto';
  notFullWidthOnMobile?: boolean;
  navigationMode?: 'normal' | 'wide';
  navigationOffset?: 'normal' | 'top';

  classes?: {
    slider?: string;
    slide?: string;
  };
}

export const MainSlider = memo(({
  className,
  slides = [],
  spaceBetween,
  classes,
  slidesPerView = 'auto',
  notFullWidthOnMobile = false,
  navigationMode = 'normal',
  navigationOffset = 'normal',
}: MainSliderProps) => {
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);
  const prevBtnId = useId();
  const nextBtnId = useId();
  const isDesktop = useMediaQuery(breakpoints.tablet);
  return (
    <div className={cn(styles.root, className)}>
      <Slider
        className={cn(
          classes?.slider,
          styles.wrapper,
          { [styles.not_full_width_on_mobile]: notFullWidthOnMobile },
        )}
        onBeforeInit={(swiper) => {
          (swiper.params.navigation! as NavigationOptions).prevEl = document.getElementById(prevBtnId);
          (swiper.params.navigation! as NavigationOptions).nextEl = document.getElementById(nextBtnId);
        }}
        spaceBetween={spaceBetween || isDesktop ? 16 : 8}
        grabCursor
        navigation={{
          nextEl: navigationNextRef.current,
          prevEl: navigationPrevRef.current,
        }}
        slides={slides}
        slideClassName={classes?.slide}
        slidesPerView={slidesPerView}
        scrollbar={{
          hide: false,
        }}
        modules={[Navigation, Scrollbar]}
      />
      <div className={styles.navigation}>
        <button
          id={prevBtnId}
          ref={navigationPrevRef}
          className={cn(
            styles.navBtn,
            styles[`navBtn_offset_${navigationOffset}`],
            styles.prevBtn,
            styles[`prevBtn_${navigationMode}`],
          )}
        >
          <Svg width={17} Icon={ChevronLeftIcon} stroke="black" />
        </button>
        <button
          id={nextBtnId}
          ref={navigationNextRef}
          className={cn(
            styles.navBtn,
            styles[`navBtn_offset_${navigationOffset}`],
            styles.nextBtn,
            styles[`nextBtn_${navigationMode}`],
          )}
        >
          <Svg width={17} Icon={ChevronRightIcon} stroke="black" />
        </button>
      </div>
    </div>

  );
});
