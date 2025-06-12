import { memo } from 'react';
import cn from 'classnames';
// import { RangeSlider } from '@/shared/ui/RangeSlider';
import { CardView } from '@/shared/types/common';
import { Flex } from '@/shared/ui/Flex';
// import { Typography } from '@/shared/ui/Typography';
import { useTranslation } from 'next-i18next';
// import { viewSwitcherMapper } from './viewSwitcherMapper';
import { Button } from '@/shared/ui/Button';
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery';
import { breakpoints } from '@/shared/config/breakpoints';
import GridView4Plate from '@/shared/assets/icons/grid-view-plate-4.svg';
import GridView3Plate from '@/shared/assets/icons/grid-view-plate-3.svg';
import GridView2Plate from '@/shared/assets/icons/grid-view-plate-2.svg';
import GridView1Plate from '@/shared/assets/icons/grid-view-plate-1.svg';
import { Svg } from '@/shared/ui/Svg';
import styles from './GridViewSwitcher.module.scss';

interface GridViewSwitcherProps {
  className?: string;
  value: CardView;
  onChange: (view: CardView) => void;
}

export const GridViewSwitcher = memo(({ onChange, value, className }:GridViewSwitcherProps) => {
  // const rangeValue = viewSwitcherMapper.viewToValue(value);
  // const changeHandler = (value: number | number[]) => {
  //   const viewValue = viewSwitcherMapper.valueToView(value as number);
  //   onChange(viewValue);
  // };
  const isMobile = useMediaQuery(breakpoints['only-mobile']);

  const firstLabel = isMobile ? <Svg width={16} Icon={GridView1Plate} stroke="black" /> : <Svg width={24} Icon={GridView4Plate} stroke="black" />;
  const secondLabel = isMobile ? <Svg width={16} Icon={GridView2Plate} stroke="black" /> : <Svg width={24} Icon={GridView3Plate} stroke="black" />;

  const handleFirstClick = () => {
    onChange(CardView.NORMAL);
  };

  const handleSecondClick = () => {
    onChange(CardView.BIG);
  };

  const { t } = useTranslation();
  return (
    <Flex
      gap="16"
      align="center"
      direction={{
        'only-mobile': 'row',
        tablet: 'row-reverse',
      }}
      className={cn(styles.root, className)}
    >
      {/* <Typography variant="body-2">{t('view')}</Typography> */}
      {/* <RangeSlider value={rangeValue} onChange={changeHandler} min={0} max={2} /> */}
      <Flex className={styles.toggleWrapper} gap="8" align="center">
        <Button
          className={cn(styles.button, { [styles.active]: value === CardView.NORMAL })}
          onClick={handleFirstClick}
          size="small"
        >
          {firstLabel}
        </Button>
        <Button
          className={cn(styles.button, { [styles.active]: value === CardView.BIG })}
          onClick={handleSecondClick}
          size="small"
        >
          {secondLabel}
        </Button>
      </Flex>
    </Flex>
  );
});
