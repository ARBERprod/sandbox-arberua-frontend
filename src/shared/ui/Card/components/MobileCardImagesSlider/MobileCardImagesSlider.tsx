import cn from 'classnames';
import styles from './MobileCardImagesSlider.module.scss';
import { Slide, Slider } from '@/shared/ui/Slider';
import { ImageType } from '@/shared/types/common';
import { AppImage } from '@/shared/ui/AppImage';

interface MobileCardImagesSliderProps {
  className?: string;
  pictures: ImageType[];
}

export const MobileCardImagesSlider = ({
  className,
  pictures = [],
}: MobileCardImagesSliderProps) => {
  const slides: Slide[] = pictures.map((p, idx) => ({
    id: idx,
    slide: <AppImage unoptimized alt="" src={p} />,
  }));
  return (
    <div className={cn(styles.root, className)}>
      <Slider
        slides={slides}
        slidesPerView={1}
        className={styles.slider}
        slideClassName={styles.slide}
      />
    </div>
  );
};
