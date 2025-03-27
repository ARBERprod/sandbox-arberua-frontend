import { memo } from 'react';
import cn from 'classnames';
import { RangeSlider } from '@/shared/ui/RangeSlider';
import { Flex } from '@/shared/ui/Flex';
import { TextField } from '@/shared/ui/Form/TextField';
import styles from './RangeField.module.scss';

interface RangeFieldProps {
  className?: string;
  min: number;
  max: number;
  startValue: number;
  endValue: number;
  onChange: (value: [number, number]) => void;
}

export const RangeField = memo(({
  className, onChange, max, min = 0, startValue = 0, endValue,
}:RangeFieldProps) => {
  const onSliderChange = (value: number | number[]) => {
    if (!Array.isArray(value)) return;
    const [start, end] = value;
    onChange([start, end]);
  };

  const startInputChangeHandler = (name: string, value: string) => {
    if (Number(value) > endValue) {
      onChange([endValue, endValue]);
    } else {
      onChange([Number(value), endValue]);
    }
  };
  const endInputChangeHandler = (name: string, value: string) => {
    if (Number(value) < startValue) {
      onChange([startValue, startValue]);
    } else {
      onChange([startValue, Number(value)]);
    }
  };

  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.slider}>
        <RangeSlider min={min} max={max} value={[startValue, endValue]} onChange={onSliderChange} range />
      </div>
      <Flex gap="16" align="center">
        <TextField min={0} max={max} type="number" className={styles.field} onChange={startInputChangeHandler} name="start" value={startValue} />
        <div className={styles.divider} />
        <TextField min={0} max={max} type="number" className={styles.field} onChange={endInputChangeHandler} name="end" value={endValue} />
      </Flex>
    </div>
  );
});
