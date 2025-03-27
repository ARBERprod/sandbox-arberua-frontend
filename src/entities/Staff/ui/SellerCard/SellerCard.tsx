import { memo } from 'react';
import { Card } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';
import { useRouter } from 'next/router';
import { routerPaths } from '@/shared/config/router';
import { useTranslation } from 'next-i18next';
import styles from './SellerCard.module.scss';
import { Staff } from '../../model/types';
import { AppImage } from '@/shared/ui/AppImage';

interface SellerCardProps {
  className?: string;
  seller: Staff;
}

export const SellerCard = memo(({ className, seller }: SellerCardProps) => {
  const { push } = useRouter();
  const { t } = useTranslation();
  return (
    <Card
      className={className}
      href={seller.url}
      title={seller.user_name}
      imageSlot={(
        <AppImage
          src={seller.picture}
          unoptimized
          alt={seller.user_name}
          lazy
        />
      )}
      hoverBehavior="fade"
      hoverContent={(
        <div className={styles.action}>
          <Button color="light-primary" onClick={() => push(seller.url)}>
            {t('consultation-sign')}
          </Button>
        </div>
      )}
    />
  );
});
