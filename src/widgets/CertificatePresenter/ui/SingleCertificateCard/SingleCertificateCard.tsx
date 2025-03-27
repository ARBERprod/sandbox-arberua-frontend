import { memo } from 'react';
import cn from 'classnames';
import { ImageType, Price } from '@/shared/types/common';
import { CertificateCard } from '@/entities/Certificate';
import { AddToCardButton } from '@/features/cart/AddToCart';
import styles from './SingleCertificateCard.module.scss';

interface SingleCertificateCardProps {
  className?: string;
  title: string;
  href: string;
  image?: ImageType;
  price: Price;
  id: string;
}

export const SingleCertificateCard = memo(({
  className,
  title,
  href,
  image,
  price,
  id,
}:SingleCertificateCardProps) => (
  <CertificateCard
    className={cn(styles.root, className)}
    title={title}
    href={href}
    image={image}
    price={price}
    id={id}
    slots={{
      cartActions: (actionsProps) => (
        <AddToCardButton
          className={styles.btn}
          {...actionsProps}
          buttonProps={{
            size: 'medium',
            color: 'light-primary',
          }}
        />
      ),
    }}
  />
));
