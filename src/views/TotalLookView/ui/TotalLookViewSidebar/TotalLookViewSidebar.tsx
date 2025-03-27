import { memo, useMemo } from 'react';
import cn from 'classnames';
import { Typography } from '@/shared/ui/Typography';
import { Flex } from '@/shared/ui/Flex';
import { useTranslation } from 'next-i18next';
// import { BuyInOneClickButton } from '@/features/cart/BuyInOneClick';
import { ToggleWishListButton } from '@/features/wish-list/ToggleWishListButton';
import { DetailedTotalLook } from '@/entities/TotalLook';
import { useSelector } from 'react-redux';
import { AddToCardButton } from '@/features/cart/AddToCart';
import { totalLookViewSelectors } from '../../model/selectors/totalLookViewSelectors';
import styles from './TotalLookViewSidebar.module.scss';
import { TotalLookViewSidebarProducts } from '../TotalLookViewSidebarProducts';
import { getProductIds } from '@/entities/Product';

interface TotalLookViewSidebarProps {
    className?: string;
    look: DetailedTotalLook;
}

export const TotalLookViewSidebar = memo(({
  className,
  look,
}: TotalLookViewSidebarProps) => {
  const { t } = useTranslation();
  const chosenProducts = useSelector(totalLookViewSelectors.getChosenProducts);
  const chosenSkus = useSelector(totalLookViewSelectors.getChosenSkus);
  const chosenProductsCount = chosenProducts.length;
  const chosenProductsAmount = useSelector(totalLookViewSelectors.getTotalAmount);

  const productsIds = useMemo(() => chosenProducts.reduce((acc: string[], product) => {
    const sku = chosenSkus[product.id];
    if (sku === null) {
      acc.push(product.id);
    } else {
      acc.push(sku.id);
    }
    return acc;
  }, [] as string[]), [chosenSkus, chosenProducts]);

  return (
    <div className={cn(styles.root, className)}>
      <Typography variant="title-4" className={styles.title}>
        {look.title}
      </Typography>
      <Typography variant="body-2" className={styles.subtitle}>
        {look.products_count}
        {' '}
        {t('products')}
      </Typography>

      <TotalLookViewSidebarProducts products={look.products} className={styles.products} />

      <Flex justify="between" className={styles.info}>
        <Flex justify="start" align="center" className={styles.info_item}>
          <Typography variant="body-2">{t('selected')}</Typography>
          <Typography variant="body-2" className={styles.info_qty}>
            (
            {t('product', { count: chosenProductsCount })}
            )
          </Typography>
        </Flex>
        <Flex justify="end" align="center" className={styles.info_item}>
          <Typography variant="body-1">
            {chosenProductsAmount}
            {' '}
            {t('office.hrn')}
          </Typography>
        </Flex>
      </Flex>
      <div className={styles.actions}>
        <AddToCardButton
          className={styles.btn}
          buttonProps={{
            fullWidth: true,
            size: 'large',
            disabled: chosenProductsCount === 0,
          }}
          productId={productsIds}
        />
        <div className={styles.subactions}>
          {/* <BuyInOneClickButton */}
          {/*  className={styles.btn} */}
          {/*  buttonProps={{ fullWidth: true, disabled: chosenProductsCount === 0 }} */}
          {/*  productIds={productsIds} */}
          {/* /> */}
          <ToggleWishListButton productId={getProductIds(look.products)} variant="outlined" />
        </div>
      </div>
    </div>
  );
});
