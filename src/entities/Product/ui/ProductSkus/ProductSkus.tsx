import cn from 'classnames';
import styles from './ProductSkus.module.scss';
import { Typography } from '@/shared/ui/Typography';
import { Flex } from '@/shared/ui/Flex';
import { ProductSku } from '../../model/types';
import { useMemo } from 'react';

interface ProductSkusProps {
  className?: string;
  skus: ProductSku[];
  disableIfIsNotSale?: boolean;
  hideNotSaleVariants?: boolean;
  activeSkuId?: string | null;
  onClick?: (sku: ProductSku) => void;
}

export const ProductSkus = ({
  className,
  skus = [],
  onClick,
  disableIfIsNotSale,
  hideNotSaleVariants,
  activeSkuId,
}: ProductSkusProps) => {
  const filteredSkus = useMemo(() => {
    if (!hideNotSaleVariants) return skus;
    return skus.filter((sku) => sku.is_sale);
  }, [hideNotSaleVariants, skus]);
  return (
    <Flex align="center" gap="10" className={cn(styles.root, className)}>
      {filteredSkus.map((sku) => (
        <button
          type="button"
          disabled={disableIfIsNotSale && !sku.is_sale}
          onClick={() => onClick?.(sku)}
          key={sku.id}
        >
          <Typography
            className={cn(styles.sku, {
              [styles.active]: activeSkuId === sku.id,
              [styles.noSale]: !sku.is_sale,
              [styles.disabled]: disableIfIsNotSale && !sku.is_sale,
            })}
            as="span"
            variant="body-2"
          >
            {sku.title}
          </Typography>
        </button>
      ))}
    </Flex>
  );
};
