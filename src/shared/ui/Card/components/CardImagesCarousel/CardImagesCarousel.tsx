import cn from 'classnames';
import styles from './CardImagesCarousel.module.scss';
import { ImageType } from '@/shared/types/common';
import { HoverImagesCarousel } from '../HoverImagesCarousel';
import { MobileCardImagesSlider } from '../MobileCardImagesSlider';

interface CardImagesCarouselProps {
  className?: string;
  pictures: ImageType[];
}

export const CardImagesCarousel = ({
  className,
  pictures = [],
}: CardImagesCarouselProps) => (
  <>
    <HoverImagesCarousel pictures={pictures} className={cn(className, styles.desktop)} />
    <MobileCardImagesSlider pictures={pictures} className={cn(className, styles.mobile)} />
  </>
);
