import { memo, useState } from 'react';
import cn from 'classnames';
import { Flex, FlexCol } from '@/shared/ui/Flex';
import { PreorderProductButton } from '@/features/PreOrderProduct';
import { ToggleWishListButton } from '@/features/wish-list/ToggleWishListButton';
import { useTranslation } from 'next-i18next';
import { ErrorMessage } from '@/shared/ui/Form/ErrorMessage';
import { AddToCardButton } from '@/features/cart/AddToCart';
import { BuyInOneClickButton } from '@/features/cart/BuyInOneClick';
import { ProductTryOnDrawer } from '../ProductTryOnDrawer';
import styles from './ProductCardActions.module.scss';
import { useProductSkus } from '@/views/ProductView/lib/ProductSkusContext';
import { DetailedProduct } from '@/entities/Product';
import { getUserDataForAnalytics } from '@/views/OfficeView/analytics/getUserDataForAnalytics';
import { useAuth, useUserId } from '@/entities/Session';
import { getRandomEventId } from '@/shared/lib/utils/getRandomEventId';
import { measurementsPost, pushDataLayerEvent, pushGAdsEvent } from '@/shared/lib/analytics/dataLayer';

interface ProductCardActionsProps {
    className?: string;
    productId: string;
    product?: DetailedProduct;
    isSale?: boolean;
}

export const ProductCardActions = memo(({
  productId,
  className,
  product,
  isSale,
}: ProductCardActionsProps) => {
  const { t } = useTranslation();
  const [isOpenTryOn, setIsOpenTryOn] = useState(false);
  const { chosenSku, productSkus } = useProductSkus();
  const clientId = useUserId();

  const { userData } = useAuth();
  const [eventId] = useState(() => getRandomEventId());

  const onTryOnClose = () => {
    setIsOpenTryOn(false);
  };

  const onAddToCart = (eventId: string) => {
    const items = [{
      id: product?.parent_id || productId,
      name: product?.title || '',
      category: product?.category || '',
      brand: product?.brand || '',
      variant: chosenSku?.title || product?.skus?.[0]?.title || '',
      price: product?.price.value || 0,
      quantity: 1,
      currency: 'UAH',
      image: product?.pictures?.[0]?.cropped || '',
      url: product?.url || '',
    }];

    const itemsMeasurements = [{
      item_id: product?.parent_id,
      item_name: product?.title,
      affiliation: 'Онлайн-магазин',
      // coupon: '',
      currency: 'UAH',
      // discount: '',
      // index: 0,
      item_brand: product?.brand,
      item_category: product?.category,
      // item_list_id: product.category.id,
      // item_list_name: product.category.title,
      item_variant: product?.skus?.[0]?.title || '',
      price: product?.price.value || 0,
      quantity: 1,
    }];

    const params = {
      currency: 'UAH',
      value: product?.price.value || 0,
      items: itemsMeasurements,
    };

    const user_data = getUserDataForAnalytics(userData);

    pushDataLayerEvent({
      event: 'add_to_cart',
      event_id: eventId,
      ecommerce: {
        currency: 'UAH',
        value: product?.price.value || 0,
        items,
      },
      ...(user_data && { user_data }),
    });

    measurementsPost({
      name: 'add_to_cart',
      params,
      client_id: clientId,
    });

    // Google Ads Dynamic Remarketing
    pushGAdsEvent({
      event: 'GAds_add_to_cart',
      value: product?.price.value || 0,
      items: [{
        id: product?.parent_id || productId,
        google_business_vertical: 'retail',
      }],
    });

    if (typeof window !== 'undefined' && window?.fbq) {
      const paramsFbq = {
        value: product?.price.value || 0,
        currency: 'UAH',
        content_ids: [product?.parent_id || productId],
        content_name: [product?.title || ''],
        content_category: [product?.category || ''],
        content_type: 'product',
      };
      // window?.fbq('track', 'AddToCart', paramsFbq, { eventID: eventId });
    }
  };
  const itemId = chosenSku?.id || productId;

  return (
    <FlexCol gap="12" className={cn(styles.root, className)}>
      {!isSale
                && (
                  <ErrorMessage
                    error={t('preorder.error.not_available')}
                    className={styles.not_available}
                  />
                )}
      <Flex gap="12">
        {isSale ? (
          <AddToCardButton
            productId={itemId}
            onAddToCart={onAddToCart}
            buttonProps={{
              fullWidth: true,
              size: 'large',
            }}
          />
        ) : (
          <PreorderProductButton productId={itemId} />
        )}
        <ToggleWishListButton productId={productId} variant="outlined" />
      </Flex>
      {isSale && (
        <>
          <Flex gap="12">
            <BuyInOneClickButton productIds={[itemId]}>
              {t('quick_order')}
            </BuyInOneClickButton>
            {/* <Button
              fullWidth
              size="large"
              color="light-secondary"
              className={styles.btn}
              onClick={onTryOnOpen}
            >
              {t('try_on')}
            </Button> */}
            <ProductTryOnDrawer
              isOpen={isOpenTryOn}
              onClose={onTryOnClose}
              productId={productId}
            />
          </Flex>
          {/* <AvailabilityStoresButton skus={productSkus} chosenSkuId={chosenSku?.id || null} productId={itemId}>{t('availability_stores')}</AvailabilityStoresButton> */}
        </>
      )}
    </FlexCol>
  );
});
