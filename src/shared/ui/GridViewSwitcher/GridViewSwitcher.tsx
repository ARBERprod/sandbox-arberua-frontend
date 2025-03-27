import { memo } from 'react';
import cn from 'classnames';
import { RangeSlider } from '@/shared/ui/RangeSlider';
import { CardView } from '@/shared/types/common';
import { Flex } from '@/shared/ui/Flex';
import { Typography } from '@/shared/ui/Typography';
import { useTranslation } from 'next-i18next';
import { viewSwitcherMapper } from './viewSwitcherMapper';
import styles from './GridViewSwitcher.module.scss';

interface GridViewSwitcherProps {
  className?: string;
  value: CardView;
  onChange: (view: CardView) => void;
}

export const GridViewSwitcher = memo(({ onChange, value, className }:GridViewSwitcherProps) => {
  const rangeValue = viewSwitcherMapper.viewToValue(value);
  const changeHandler = (value: number | number[]) => {
    const viewValue = viewSwitcherMapper.valueToView(value as number);
    onChange(viewValue);
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
      <Typography variant="body-2">{t('view')}</Typography>
      <RangeSlider value={rangeValue} onChange={changeHandler} min={0} max={2} />
    </Flex>
  );
});
