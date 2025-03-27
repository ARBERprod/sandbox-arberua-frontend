import { memo } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { Typography } from '@/shared/ui/Typography';
import { Flex } from '@/shared/ui/Flex';
import { AppImage } from '@/shared/ui/AppImage';
import styles from './SellerInfo.module.scss';
import { DetailedStaff } from '../../model/types';

interface SellerInfoProps {
  className?: string;
  sellerInfo: DetailedStaff;
}

export const SellerInfo = memo(({ className, sellerInfo }:SellerInfoProps) => {
  const { t } = useTranslation();
  return (
    <div className={cn(styles.root, className)}>
      <Flex justify="center" direction="column" align="center">
        <Typography className={styles.title} variant="title-4" centered>{sellerInfo.user_name}</Typography>
        <Typography className={styles.subtitle} variant="body-2" as="span" color="grey-dark">
          (
          {t('rating')}
          {' '}
          {sellerInfo.comments.comments_avg_rating || 0}
          )
        </Typography>
        <Link href={sellerInfo.store.url} className={styles.details}>
          <Typography variant="body-2" as="span">{sellerInfo.store.title}</Typography>
        </Link>
        <div className={styles.image_wrap}>
          <div className={styles.image_inner}>
            <AppImage unoptimized alt="sellerName" src={sellerInfo.picture} className={styles.image} />
          </div>
        </div>
      </Flex>
    </div>
  );
});
