import { memo } from 'react';
import cn from 'classnames';
import { Container } from '@/shared/ui/Container';
import { Consultations } from '@/widgets/Consultations';
import { SellerInfo, DetailedStaff, Staff } from '@/entities/Staff';
import { SellerComments } from '@/widgets/SellerComments';
import styles from './SellerView.module.scss';

interface SellerViewProps {
  className?: string;
  seller: DetailedStaff;
}

export const SellerView = memo(({
  className,
  seller,
}: SellerViewProps) => {
  const employee: Staff = {
    url: seller.url,
    id: seller.id,
    user_name: seller.user_name,
    picture: seller.picture,
    store: seller.store,
  };
  return (
    <div className={cn(styles.root, className)}>
      <Container className={styles.container}>
        <SellerInfo sellerInfo={seller} className={styles.info} />
        <Consultations
          isConsultantPredefined
          consultantId={seller.id}
          shopId={seller.store.id}
          consultants={[employee]}
          fullwidth
          className={styles.consultations}
        />
        <SellerComments sellerId={seller.id} />
      </Container>
    </div>
  );
});
