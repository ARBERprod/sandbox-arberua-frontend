import { memo, ReactElement } from 'react';
import cn from 'classnames';
import { Card } from '@/shared/ui/Card';
import { Flex, FlexCol } from '@/shared/ui/Flex';
import { ItemPrice } from '@/shared/ui/ItemPrice';
import { ImageType, Price } from '@/shared/types/common';
import styles from './CertificateCard.module.scss';
import { AppImage } from '@/shared/ui/AppImage';

interface CertificateCardProps {
  className?: string;
  title: string;
  href: string;
  image?: ImageType;
  price: Price;
  id: string;

  slots?: {
    cartActions: (actionsProps: {productId: string}) => ReactElement;
  }
}

export const CertificateCard = memo(({
  className,
  title,
  href,
  image,
  price,
  id,
  slots,
}:CertificateCardProps) => (
  <Card
    className={cn(styles.root, className)}
    href={href}
    imageSlot={(
      <AppImage
        src={image}
        unoptimized
        alt={title}
        lazy
      />
    )}
    hoverContent={(
      <Flex justify="center" className={styles.button_wrap}>
        {slots?.cartActions?.({
          productId: id,
        })}
      </Flex>
    )}
    title={title}
    footer={(
      <Flex fullWidth justify="start">
        <FlexCol gap="4" align="center">
          <ItemPrice
            price={price}
          />
        </FlexCol>
      </Flex>
    )}
    classes={{ title: styles.title }}
  />
));
