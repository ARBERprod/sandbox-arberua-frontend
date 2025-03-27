import {
  CSSProperties, FC, ReactNode, Ref,
} from 'react';
import cn from 'classnames';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { SwiperProps } from 'swiper/react/swiper-react';
import styles from './Slider.module.scss';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';

export interface Slide {
  id: string | number;
  slide: ReactNode;
}

interface Slots {
  containerStart?: { className?: string; content: ReactNode };
  containerEnd?: { className?: string; content: ReactNode };
  wrapperStart?: { className?: string; content: ReactNode };
  wrapperEnd?: { className?: string; content: ReactNode };
}

interface SliderProps extends SwiperProps {
  className?: string;
  slides: Slide[];
  slideClassName?: string;
  ref?: Ref<SwiperRef>;
  slots?: Slots;
  paginationActive?: boolean;
}

export const Slider: FC<SliderProps> = ({
  className,
  slideClassName,
  slides = [],
  slots,
  ref,
  children,
  paginationActive,
  ...swiperProps
}) => (
  <Swiper
    ref={ref}
    className={cn(styles.root, className)}
    modules={[Pagination]}
    pagination={paginationActive ? {
      clickable: true,
    } : undefined}
    style={{
      '--swiper-pagination-color': '#fff',
      '--swiper-pagination-bullet-inactive-color': '#fff',
      '--swiper-pagination-bullet-inactive-opacity': '0.5',
    } as CSSProperties}
    {...swiperProps}
  >
    {
      slides.map(
        (slide) => (
          <SwiperSlide
            className={cn(styles.slide, slideClassName)}
            key={slide.id}
          >
            {slide.slide}
          </SwiperSlide>
        ),
      )
    }
    {children}
    {slots?.containerStart
    && <div className={slots.containerStart.className} slot="container-start">{slots.containerStart.content}</div>}

    {slots?.containerEnd
    && <div className={slots.containerEnd.className} slot="container-end">{slots.containerEnd.content}</div>}

    {slots?.wrapperStart
    && <div className={slots.wrapperStart.className} slot="wrapper-start">{slots.wrapperStart.content}</div>}

    {slots?.wrapperEnd
    && <div className={slots.wrapperEnd.className} slot="wrapper-end">{slots.wrapperEnd.content}</div>}

  </Swiper>
);
