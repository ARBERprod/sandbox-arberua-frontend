import { memo } from 'react';
import cn from 'classnames';
import { FullscreenThumbsSlider } from '@/shared/ui/Slider/FullscreenThumbsSlider';
import { useGallery } from '../../lib/useGallery';
import styles from './GalleryActiveSlider.module.scss';

interface GalleryActiveSliderProps {
  className?: string;
}

export const GalleryActiveSlider = memo(({ className }: GalleryActiveSliderProps) => {
  const {
    images,
    setActiveSlideIndex,
    activeSlideIndex,
    closeGallery,
    isGalleryOpen,
  } = useGallery();
  return (
    <FullscreenThumbsSlider
      className={cn(styles.root, className)}
      images={images}
      isOpen={isGalleryOpen}
      activeSlideIndex={activeSlideIndex}
      onClose={closeGallery}
      onSlideChange={(slideIndex) => setActiveSlideIndex(slideIndex)}
    />
  );
});
