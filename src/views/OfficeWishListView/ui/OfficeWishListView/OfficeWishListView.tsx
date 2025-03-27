import { memo } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useSelector } from 'react-redux';
import { OfficeProductsGrid, WishListProductCard } from '@/widgets/ProductPresenter';
import { PageLoader } from '@/shared/ui/Loader';
import { Button } from '@/shared/ui/Button';
import { Typography } from '@/shared/ui/Typography';
import { Flex, FlexCol } from '@/shared/ui/Flex';
import { ErrorMessage } from '@/shared/ui/Form/ErrorMessage';
import { wishListSelector } from '@/entities/WishList';
import { routerPaths } from '@/shared/config/router';
import { ClearWishListButton } from '@/features/wish-list/ClearWishListButton';
import styles from './OfficeWishListView.module.scss';

interface OfficeWishlistProps {
  className?: string;
}

export const OfficeWishListView = memo(({ className }: OfficeWishlistProps) => {
  const { push } = useRouter();
  const goToHomePage = () => {
    push(routerPaths.main);
  };

  const { isLoading, isError, products } = useSelector(wishListSelector.getWishList);

  const { t } = useTranslation('office-page');

  if (isLoading) return <PageLoader />;

  if (isError) return <ErrorMessage error="Error" />;

  if (products.length === 0) {
    return (
      <div className={cn(styles.root, className)}>
        <FlexCol align="center" className={styles.header} gap="28">
          <Typography centered variant="title-4">{t('wishlist_empty')}</Typography>
          <Button onClick={goToHomePage} size="medium">{t('go_to_main')}</Button>
        </FlexCol>
      </div>
    );
  }

  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.header}>
        <Flex justify="between" align="center">
          <Typography variant="title-4">{t('wishlist')}</Typography>
          <ClearWishListButton className={styles.button} />
        </Flex>
      </div>
      <OfficeProductsGrid
        products={products}
        ProductCard={WishListProductCard}
      />
    </div>
  );
});
