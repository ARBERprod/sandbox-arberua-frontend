import { memo } from 'react';
import cn from 'classnames';
import { Container } from '@/shared/ui/Container';
import { DetailedShop, ShopDetails } from '@/entities/Shop';
import { ErrorMessage } from '@/shared/ui/Form/ErrorMessage';
import { Consultations } from '@/widgets/Consultations';
import { useTranslation } from 'next-i18next';
import styles from './ShopView.module.scss';
import { useRouter } from 'next/router';
import { PopularsSection } from '@/views/MainView/ui/sections/PopularsSection';
import { SliderData } from '@/views/MainView/api/types';

interface ShopViewProps {
  className?: string;
  shop: DetailedShop;
  popular: SliderData[];
}

export const ShopView = memo(({
  shop,
  className,
  popular,
}: ShopViewProps) => {
  const { query } = useRouter();
  const { t } = useTranslation();

  return (
    <div className={cn(styles.root, className)}>
      <Container className={styles.container}>
        {shop
          ? <ShopDetails shop={shop} />
          : <ErrorMessage error={t('shop.error')} />}
        <Consultations shopId={query.id as string || ''} consultants={shop.staff} />
        <PopularsSection className={styles.populars} popular={popular} />
      </Container>
    </div>
  );
});
