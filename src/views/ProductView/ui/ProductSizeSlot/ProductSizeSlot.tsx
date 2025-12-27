import { useTranslation } from 'next-i18next';
import {
  ProductSkus,
  ProductSku,
} from '@/entities/Product';
import { Flex } from '@/shared/ui/Flex';
import { Typography } from '@/shared/ui/Typography';
import styles from './ProductSizeSlot.module.scss';

import { usePreorderProduct } from '@/features/PreOrderProduct';
import cn from 'classnames';
import { useProductSkus } from '@/views/ProductView/lib/ProductSkusContext';
import { SizeGridButton } from '@/features/ShowSizeGrid';

interface ProductSizeSlotProps {
  className?: string;
}

export const ProductSizeSlot = ({
  className,
}: ProductSizeSlotProps) => {
  const {
    productSkus, chosenSku, setChosenSku, sizingType,
  } = useProductSkus();

  const { t } = useTranslation();
  const { openPreorderProductModal } = usePreorderProduct();

  const clickHandler = (sku: ProductSku) => {
    if (!sku.is_sale) {
      openPreorderProductModal(sku.id);
    } else {
      setChosenSku(sku);
    }
  };

  if (!productSkus || productSkus.length === 0) return null;

  return (
    <div className={cn(styles.root, className)}>
      {productSkus.length > 0 && (
        <Flex className={styles.size} gap="8" align="center">
          <Typography variant="body-2">
            {t('size')}
            :
          </Typography>
          <SizeGridButton variant="icon" sizingType={sizingType} />
          <div className={styles.content}>
            <ProductSkus onClick={clickHandler} activeSkuId={chosenSku?.id} skus={productSkus} />
          </div>
        </Flex>
      )}
    </div>
  );
};
