import {
  memo, ReactElement, useEffect, useRef, useState,
} from 'react';
import cn from 'classnames';
import { Product, ProductSku } from '../../model/types';
import { Flex, FlexCol } from '@/shared/ui/Flex';
import { ItemPrice } from '@/shared/ui/ItemPrice';
import { Card, CardImagesCarousel, CardProps } from '@/shared/ui/Card';
import { CardView } from '@/shared/types/common';
import styles from './ProductCard.module.scss';
import { getItemPrices, ProductSkus } from '@/entities/Product';
import { QuickViewModal } from '@/entities/Product/ui/QuickViewModal';

interface ActionProps {
  productId: string;
}

interface ProductCardProps {
  className?: string;
  product: Product;
  view?: CardView;

  slots?: {
    cartActions?: (actionsProps: ActionProps) => ReactElement;
    productActions?: (productId: string) => ReactElement;
  };

  classes?: CardProps['classes'];
}

export const ProductCard = memo(({
  className,
  product,
  view = CardView.NORMAL,
  slots,
  classes,
}: ProductCardProps) => {
  const modificationsExist = product.skus !== null;
  const [chosenSku, setChosenSku] = useState<ProductSku | null>(null);
  const initedRef = useRef(false);

  const { price, oldPrice } = getItemPrices(product, chosenSku);
  const [isQuickViewOpen, setQuickViewOpen] = useState(false);

  const openQuickView = () => setQuickViewOpen(true);
  const closeQuickView = () => setQuickViewOpen(false);

  useEffect(() => {
    if (!modificationsExist || initedRef.current) return;
    const availableSku = product.skus?.find((sku) => sku.is_sale);
    if (availableSku) {
      setChosenSku(availableSku);
    }
    initedRef.current = true;
  }, [product.skus, modificationsExist]);

  const sale = oldPrice && oldPrice?.value !== 0
    ? Math.floor(((oldPrice.value - price.value) / oldPrice.value) * 100) : null;
  return (
    <div className={cn(styles.root, className)}>
      <Card
        view={view}
        title={product.title}
        href={product.url}
        sale={sale}
        className={cn(styles.card, { [styles.hasHover]: false })}
        imageSlot={<CardImagesCarousel pictures={product.pictures.slice(0, 1)} />}
        hoverContent={slots?.cartActions ? (
          <div className={styles.hoverFooter}>
            <div className={styles.top}>
              {slots?.cartActions?.({
                productId: chosenSku?.id || product.id,
              })}
            </div>
            <div className={cn(styles.bottom, { [styles.hide]: !modificationsExist })}>
              <ProductSkus
                hideNotSaleVariants
                disableIfIsNotSale
                skus={product.skus || []}
                activeSkuId={chosenSku?.id || null}
                onClick={(sku) => setChosenSku(sku)}
              />
            </div>
          </div>
        ) : null}
        actions={slots?.productActions?.(product.id)}
        footer={(
          <Flex fullWidth>
            <FlexCol gap="4" align="center">
              <ItemPrice
                price={price}
                oldPrice={oldPrice}
              />
            </FlexCol>
            <div className={styles.addToCartMob}>
              <button onClick={openQuickView}>
                Быстрый просмотр
              </button>
            </div>
          </Flex>
        )}
        classes={classes}
      />
      <QuickViewModal
        isOpen={isQuickViewOpen}
        onClose={closeQuickView}
        product={product}
        cartActions={slots?.cartActions}
      />
    </div>
  );
});
