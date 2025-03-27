import { FC } from 'react';
import cn from 'classnames';
import Slider, { SliderProps } from 'rc-slider';
import 'rc-slider/assets/index.css';
import styles from './RangeSlider.module.scss';

export interface RangeSliderProps extends SliderProps {
  range?: boolean;
  value: number | number[];
  onChange?: (value: number | number[]) => void;
  className?: string;
  min: number;
  max: number;
  start?: number;
  end?: number;
  step?: number;
}

export const RangeSlider: FC<RangeSliderProps> = ({
  className,
  range,
  value,
  onChange,
  max,
  min,
  ...rest
}) => {
  const changeHandler = (value: number | number[]) => {
    onChange?.(value);
  };

  return (
    <Slider
      className={cn(styles.slider, className)}
      range={range}
      onChange={changeHandler}
      min={min}
      max={max}
      value={value}
      allowCross={false}
      {...rest}
    />
  );
};
