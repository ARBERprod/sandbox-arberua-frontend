import { memo } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { Flex, FlexCol } from '@/shared/ui/Flex';
import { AppImage } from '@/shared/ui/AppImage';
import { Typography } from '@/shared/ui/Typography';
import { useTranslation } from 'next-i18next';
import { OrderProduct } from '../../model/types';
import styles from './OrderProductCard.module.scss';
import { displayPrice } from '@/shared/lib/utils/displayPrice';

interface OrderProductCardProps {
  className?: string;
  product: OrderProduct;
  withDetails?: boolean;
}

export const OrderProductCard = memo(({ className, product, withDetails }:OrderProductCardProps) => {
  const { t } = useTranslation(['common', 'sizes']);
  return (
    <Flex gap="12" className={cn(styles.root, className)}>
      <div className={styles.image}>
        <AppImage unoptimized alt={product.title} src={product.picture} />
      </div>
      <FlexCol gap="8">
        <div className={styles.linkWrap}>
          <Link href={product.url} className={styles.link}>
            <Typography as="span" variant="body-2" color="blue">{product.title}</Typography>
          </Link>
        </div>
        {product.properties?.map(({ property, value }) => (
          <Typography key={property} variant="body-3">
            {property}
            :
            {' '}
            {value}
          </Typography>
        ))}
        {withDetails
        && (
          <>
            <Typography variant="body-3">
              {t('common:office.deduct_bonus')}
              :
              {' '}
              {product.bonus_deduction}
            </Typography>
            <Typography variant="body-3">
              {t('common:office.goodsQty')}
              :
              {' '}
              {product.quantity}
            </Typography>
            <Typography variant="body-3">
              {t('common:office.price')}
              :
              {' '}
              {displayPrice(product.price)}
            </Typography>
          </>
        )}
      </FlexCol>
    </Flex>
  );
});
