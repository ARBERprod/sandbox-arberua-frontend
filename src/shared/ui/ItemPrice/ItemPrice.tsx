import { memo } from 'react';
import { Flex } from '@/shared/ui/Flex';
import { Typography } from '@/shared/ui/Typography';
import styles from './ItemPrice.module.scss';
import { Price } from '@/shared/types/common';
import { displayPrice } from '@/shared/lib/utils/displayPrice';

interface ItemPriceProps {
  className?: string;
  price: Price;
  oldPrice?: Price | false;
  variant?: 'normal' | 'search';
}

export const ItemPrice = memo(({
  price, oldPrice, className, variant,
}: ItemPriceProps) => {
  const hasDiscount = oldPrice && oldPrice.value > 0;

  return (
    <Flex align="baseline" gap="8" className={className}>
      <Typography
        variant="body-2"
        color={hasDiscount ? 'red' : 'grey-dark'}
      >
        {displayPrice(price)}
      </Typography>
      {hasDiscount && (
        <Typography
          variant={variant === 'search' ? 'body-2' : 'body-3'}
          className={styles.oldPrice}
          color="#818181"
        >
          {displayPrice(oldPrice)}
        </Typography>
      )}
    </Flex>
  );
});
