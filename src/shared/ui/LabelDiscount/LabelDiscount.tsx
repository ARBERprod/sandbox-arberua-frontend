import { memo } from 'react';
import cn from 'classnames';
import { Typography } from '@/shared/ui/Typography';
import { FlexCenter } from '@/shared/ui/Flex';
import styles from './LabelDiscount.module.scss';

interface LabelDiscountProps {
  className?: string;
  discount?: string;
}

export const LabelDiscount = memo(({ className, discount }:LabelDiscountProps) => (
  <FlexCenter className={cn(styles.root, className)}>
    <Typography variant="body-2" color="white">
      -
      {discount}
    </Typography>
  </FlexCenter>
));
