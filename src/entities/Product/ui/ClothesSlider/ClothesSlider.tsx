import { memo } from 'react';
import cn from 'classnames';
import { Svg } from '@/shared/ui/Svg';
import CrossIcon from '@/shared/assets/icons/close.svg';
import { FlexCenter } from '@/shared/ui/Flex';
import styles from './ClothesSlider.module.scss';
import { Slide, Slider } from '../../../../shared/ui/Slider/Slider';

interface ClothesSliderProps {
  className?: string;
  slides: Slide[];
  onRemove?: () => void;
  withRemoveButton?: boolean;
  classes?: {
    slider?: string;
    slide?: string;
  };
}

export const ClothesSlider = memo(({
  className, withRemoveButton, onRemove, classes, slides = [],
}:ClothesSliderProps) => (
  <div className={cn(styles.root, className)}>
    {withRemoveButton
    && (
      <FlexCenter as="button" direction="column" onClick={onRemove} className={styles.removeBtn}>
        <Svg Icon={CrossIcon} stroke="grey-dark" width={12} height={12} />
      </FlexCenter>
    )}
    <Slider
      className={cn(styles.slider, classes?.slider)}
      slideClassName={cn(styles.slide, classes?.slide)}
      slides={slides}
      grabCursor
      slidesPerView="auto"
      spaceBetween={8}
    />
  </div>
));
