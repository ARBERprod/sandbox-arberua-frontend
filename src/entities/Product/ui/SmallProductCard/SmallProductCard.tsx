import { ReactNode } from 'react';
import cn from 'classnames';
import { Flex, FlexCol } from '@/shared/ui/Flex';
import { Typography } from '@/shared/ui/Typography';
import { ItemPrice } from '@/shared/ui/ItemPrice';
import { ImageType, Price } from '@/shared/types/common';
import styles from './SmallProductCard.module.scss';
import Link from 'next/link';

interface SmallProductCardProps {
  className?: string;
  product: {
    id: string;
    url: string;
    picture: ImageType;
    title: string;
    price: Price;
    old_price: Price | false;
  };
  actions?: ReactNode;
  imageSlot: (image: ImageType) => ReactNode;
  variant?: 'normal' | 'search';
}

export const SmallProductCard = ({
  product,
  imageSlot,
  className,
  actions,
  variant = 'normal',
}: SmallProductCardProps) => (
  <Flex gap="8" className={cn(styles.root, className)}>
    <Link href={product.url}>
      {imageSlot(product.picture)}
    </Link>
    <FlexCol gap="8">
      <Link href={product.url}>
        <Typography
          dangerouslySetInnerHTML={{ __html: product.title }}
          variant={variant === 'search' ? 'body-2' : 'body-1'}
        />
      </Link>
      <ItemPrice
        price={product.price}
        oldPrice={product.old_price}
        variant={variant}
      />
      {actions
          && (
            <div className={styles.actions}>
              {actions}
            </div>
          )}
    </FlexCol>
  </Flex>
);
