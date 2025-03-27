import {
  memo, useId, useRef,
} from 'react';
import { Slide, Slider } from '@/shared/ui/Slider';
import { NavigationOptions } from 'swiper/types';
import { Navigation } from 'swiper';
import cn from 'classnames';
import ChevronRightIcon from '@/shared/assets/icons/slider-chevron-r.svg';
import ChevronLeftIcon from '@/shared/assets/icons/slider-chevron-l.svg';
import { Svg } from '@/shared/ui/Svg';
import styles from './OutOfBoundsSlider.module.scss';

interface OutOfBoundsSliderProps {
  className?: string;
  slides: Slide[];
}

export const OutOfBoundsSlider = memo(({
  className,
  slides = [],
}:OutOfBoundsSliderProps) => {
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);
  const prevBtnId = useId();
  const nextBtnId = useId();
  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.header}>
        {!!slides.length && (
          <div className={styles.navigation}>
            <button id={prevBtnId} ref={navigationPrevRef} className={cn(styles.nav_btn, styles.prev_btn)}>
              <Svg width={17} Icon={ChevronLeftIcon} stroke="black" />
            </button>
            <button id={nextBtnId} ref={navigationNextRef} className={cn(styles.nav_btn, styles.next_btn)}>
              <Svg width={17} Icon={ChevronRightIcon} stroke="black" />
            </button>
          </div>
        )}
      </div>
      {!!slides.length && (
        <div className={styles.slider_wrap}>
          <Slider
            className={styles.wrapper}
            onBeforeInit={(swiper) => {
              (swiper.params.navigation! as NavigationOptions).prevEl = document.getElementById(prevBtnId);
              (swiper.params.navigation! as NavigationOptions).nextEl = document.getElementById(nextBtnId);
            }}
            grabCursor
            navigation={{
              nextEl: navigationNextRef.current,
              prevEl: navigationPrevRef.current,
            }}
            slides={slides}
            slideClassName={styles.slide}
            slidesPerView="auto"
            modules={[Navigation]}
          />
        </div>
      )}
    </div>

  );
});
