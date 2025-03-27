import { ReactElement } from 'react';
import cn from 'classnames';
import { Typography } from '@/shared/ui/Typography';
import { Flex } from '@/shared/ui/Flex';
import { ItemPrice } from '@/shared/ui/ItemPrice';
import { AccordionList } from '@/shared/ui/Accordion';
import { Bonuses } from './Bonuses';
import styles from './ProductDetails.module.scss';
import { Price } from '@/shared/types/common';
import { StarRating } from '@/shared/ui/StarRating';
import { useTranslation } from 'next-i18next';

interface ProductDetailsProps {
  className?: string;
  title: string;
  price: Price;
  oldPrice: Price | false;
  cashback?: number | null;
  canWriteOff: number | null;
  details: ReactElement;
  commentsCount?: number;
  rating?: number;
  article?: string;

  slots?: {
    color?: ReactElement;
    size?: ReactElement;
    actions?: ReactElement;
  };
}

export const ProductDetails = ({
  details,
  className,
  cashback,
  canWriteOff,
  slots,
  title,
  price,
  oldPrice,
  rating,
  commentsCount,
  article,
}: ProductDetailsProps) => {
  const { t } = useTranslation();
  return (
    <div className={cn(styles.root, className)}>
      {article && (
        <Typography variant="body-3" className={styles.article}>
          {t('product-article')}
          :
          {' '}
          {article}
        </Typography>
      )}
      <Typography variant="title-4" className={styles.title}>{title}</Typography>
      {Number(commentsCount) > 0 && (
        <Flex gap="8" align="center" className={styles.rating}>
          <StarRating className="pb-2" readonly value={rating || 0} />
          <Typography color="grey" variant="body-3">
            (
            {t('review', { count: commentsCount })}
            )
          </Typography>
        </Flex>
      )}
      <Flex
        direction={{
          'mobile-tablet': 'column',
          desktop: 'row',
        }}
        align={{
          'mobile-tablet': 'start',
          desktop: 'center',
        }}
        className={styles.priceInfo}
      >
        <ItemPrice price={price} oldPrice={oldPrice} />
        <Bonuses canWriteOff={canWriteOff} price={price} />
      </Flex>
      {slots?.color
        && (
          <div className="mt-6">
            {slots.color}
          </div>
        )}

      {slots?.size
        && <div className="mt-6 tablet:mt-7">{slots.size}</div>}

      {slots?.actions
        && (
          <div className="mt-5 tablet:mt-9">
            {slots.actions}
          </div>
        )}
      <div className={styles.details}>
        <AccordionList>
          {details}
        </AccordionList>
      </div>
    </div>
  );
};
