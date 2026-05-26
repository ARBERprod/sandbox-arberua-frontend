import {
  memo, useEffect, useState,
} from 'react';
import cn from 'classnames';
import { DetailedProduct, getItemPrices, ProductDetails } from '@/entities/Product';
import { Gallery } from '@/shared/ui/Gallery';
import { useTranslation } from 'next-i18next';
import { AccordionItem } from '@/shared/ui/Accordion/AccordionItem';
import { ProductCardActions } from '../ProductCardActions';
import styles from './ProductDetailedCard.module.scss';
import { ProductComments } from '../ProductComments';
import { Typography } from '@/shared/ui/Typography';
import { ProductSizeSlot } from '../ProductSizeSlot';
import { useProductSkus } from '../../lib/ProductSkusContext';
import { getUserDataForAnalytics } from '@/views/OfficeView/analytics/getUserDataForAnalytics';
import { useAuth, useUserId } from '@/entities/Session';
import { measurementsPost, pushDataLayerEvent, pushGAdsEvent } from '@/shared/lib/analytics/dataLayer';
import { useRouter } from 'next/router';
import { useViewContentMutation } from '@/entities/Events';
import { getRandomEventId } from '@/shared/lib/utils/getRandomEventId';
import { NightSaleTimer } from '@/features/NightSaleTimer';

interface ProductDetailedCardProps {
  className?: string;
  product: DetailedProduct;
}

export const ProductDetailedCard = memo(({
  className,
  product,
}: ProductDetailedCardProps) => {
  const [commentsCount, setCommentsCount] = useState(0);
  const { t } = useTranslation(['common', 'product-card']);
  const { chosenSku } = useProductSkus();
  const clientId = useUserId();
  const [viewContentEvent] = useViewContentMutation();
  const { query } = useRouter();
  const { userData } = useAuth();

  const [eventId] = useState(() => getRandomEventId());

  useEffect(() => {
    const eventId = getRandomEventId();
    const params = {
      currency: 'UAH',
      value: product.price.value,
      content_ids: [product.id],
      content_name: [product.title],
      content_category: [product.category],
      content_type: 'product',
    };
    if (typeof window !== 'undefined' && window?.fbq) {
      // window?.fbq('track', 'ViewContent', params, { eventID: eventId });
    }
    viewContentEvent({
      slug: query?.slug as string,
      eventId,
    });
  }, [product, chosenSku, viewContentEvent, query?.slug, userData, eventId]);

  useEffect(() => {
    const items = [{
      id: product.id,
      name: product.title,
      category: product.category,
      brand: product.brand,
      variant: chosenSku?.title || product?.skus?.[0]?.title || '',
      price: product.price.value,
      currency: 'UAH',
      quantity: 1,
      url: product.url,
      image: product.pictures?.[0]?.cropped || '',
    }];

    const itemsMeasurements = [{
      item_id: product.id,
      item_name: product.title,
      affiliation: 'Онлайн-магазин',
      // coupon: '',
      currency: 'UAH',
      // discount: '',
      // index: 0,
      item_brand: product.brand,
      item_category: product.category,
      // item_list_id: product.category.id,
      // item_list_name: product.category.title,
      item_variant: product?.skus?.[0]?.title || '',
      price: product.price.value,
      quantity: 1,
    }];

    const params = {
      currency: 'UAH',
      value: product.price.value,
      items: itemsMeasurements,
    };

    const user_data = getUserDataForAnalytics(userData);

    pushDataLayerEvent({
      event: 'view_item',
      event_id: eventId,
      ecommerce: {
        currency: 'UAH',
        value: product.price.value,
        items,
      },
      ...(user_data && { user_data }),
    });

    measurementsPost({
      name: 'view_item',
      params,
      client_id: clientId,
    });

    // Google Ads Dynamic Remarketing
    pushGAdsEvent({
      event: 'GAds_view_item',
      value: product.price.value,
      items: [{
        id: product.parent_id || product.id,
        google_business_vertical: 'retail',
      }],
    });
  }, [product, chosenSku, clientId, userData, eventId]);

  const { price, oldPrice } = getItemPrices(product, chosenSku);
  return (
    <div
      className={cn(styles.root, className)}
    >
      <div className={styles.left}>
        <Gallery images={product.pictures} />
      </div>
      <div className={styles.right}>
        <NightSaleTimer />
        <ProductDetails
          article={product.article}
          rating={product.comments.rating || 0}
          commentsCount={commentsCount}
          title={product.title}
          oldPrice={oldPrice}
          cashback={product.bonus_accrual}
          slots={{
            actions: (
              <ProductCardActions
                productId={product.id}
                product={product}
                isSale={product.is_sale}
              />),
            size: (
              <ProductSizeSlot />
            ),
          }}
          price={price}
          canWriteOff={product?.skus?.[0].bonus_can_be_written_off || 0}
          details={(
            <>
              {product.description
                && (
                  <AccordionItem
                    title={t('product-card:description')}
                    content={(
                      <div
                        className={styles.description}
                        dangerouslySetInnerHTML={{ __html: product.description }}
                      />
                    )}
                  />
                )}
              {product.materials.length > 0
                && (
                  <AccordionItem title={t('product-card:material_and_care')}>
                    <Typography>
                      {product.materials.map((material, index) => (
                        <Typography as="span" variant="body-2" key={material.title}>
                          {material.title}
                          {index !== product.materials.length - 1 && ','}
                          {' '}
                        </Typography>
                      ))}
                    </Typography>
                  </AccordionItem>
                )}
              <AccordionItem title={t('product-card:delivery')} content={t('product-card:delivery.text')} />
              <AccordionItem title={t('product-card:return_policy')} content={t('product-card:return_policy.text')} />
              <AccordionItem title={`${t('product-card:reviews')}${commentsCount > 0 ? ` (${commentsCount})` : ''}`}>
                <ProductComments setCommentsCount={setCommentsCount} productId={product.id} />
              </AccordionItem>
            </>
          )}
        />
      </div>
    </div>
  );
});
