import { memo, ReactElement } from 'react';
import cn from 'classnames';
import { TotalLook } from '@/entities/TotalLook';
import { CardView } from '@/shared/types/common';
import { Card } from '@/shared/ui/Card';
import { Typography } from '@/shared/ui/Typography';
import { Flex } from '@/shared/ui/Flex';
import { useTranslation } from 'next-i18next';
import styles from './TotalLookCard.module.scss';
import { AppImage } from '@/shared/ui/AppImage';

interface ActionProps {
  productId: string[];
}

interface TotalLookCardProps {
  className?: string;
  totalLook: TotalLook;
  view?: CardView;
  hasHoverContent?: boolean;
  slots?: {
    cartActions?: (actionsProps: ActionProps) => ReactElement;
    productActions?: (productId: string) => ReactElement;
  };
}

export const TotalLookCard = memo(({
  className,
  totalLook,
  slots,
  view,
  hasHoverContent = true,
}: TotalLookCardProps) => {
  const { t } = useTranslation();
  return (
    <div className={cn(styles.root, className)}>
      <Card
        view={view}
        imageSlot={(
          <AppImage
            src={totalLook.picture}
            unoptimized
            alt={totalLook.title}
            lazy
          />
        )}
        title={totalLook.title}
        href={totalLook.url}
        footer={(
          <Flex fullWidth justify="center">
            <Typography variant="body-2" color="grey-dark">
              {totalLook.products_count}
              {' '}
              {t('products')}
            </Typography>
          </Flex>
        )}
        hoverContent={hasHoverContent ? (
          <div className={styles.hoverFooter}>
            <div className={styles.top}>
              {slots?.cartActions?.({ productId: totalLook.product_ids })}
            </div>
          </div>
        ) : null}
        actions={slots?.productActions?.(totalLook.id)}
      />
    </div>
  );
});
