import { memo, ReactNode } from 'react';
import { Button, ButtonProps } from '@/shared/ui/Button';
import { useTranslation } from 'next-i18next';
import { useBuyInOneClickCartActions } from '../../model/buyInOneClickCartSlice';
import { mapOneClickProductToCartItem } from '../../lib/mapOneClickProductToCartItem';
import { useGetProductsByIdsMutation } from '../../api/buyInOneClickApi';
import { PageLoader } from '@/shared/ui/Loader';
import { Portal } from '@/shared/ui/Portal';

interface BuyInOneClickButtonProps {
  className?: string;
  productIds: string[];
  children?: ReactNode;
  buttonProps?: Pick<ButtonProps<'button'>, 'color' | 'size' | 'fullWidth' | 'disabled'>;
}

export const BuyInOneClickButton = memo(({
  className,
  productIds = [],
  children,
  buttonProps,
}: BuyInOneClickButtonProps) => {
  const { t } = useTranslation();
  const [getProducts, { isLoading }] = useGetProductsByIdsMutation();
  const { setCartItems, openCart } = useBuyInOneClickCartActions();

  const clickHandler = async () => {
    if (productIds.length === 0) {
      return;
    }
    const products = await getProducts({ items: productIds }).unwrap();
    setCartItems(products.map(mapOneClickProductToCartItem));
    openCart();
  };

  return (
    <>
      {isLoading && (
        <Portal mountInBody>
          <PageLoader />
        </Portal>
      )}
      <Button
        fullWidth
        onClick={clickHandler}
        color="light-secondary"
        size="large"
        {...buttonProps}
        className={className}
      >
        {children
          || t('buy_in_one_click')}
      </Button>
    </>
  );
});
