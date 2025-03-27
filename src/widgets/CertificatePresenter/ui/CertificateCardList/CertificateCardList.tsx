import { memo } from 'react';
import cn from 'classnames';
import { Certificate } from '@/entities/Certificate';
import { SingleCertificateCard } from '../SingleCertificateCard';

import styles from './CertificateCardList.module.scss';

interface CertificateCardListProps {
  className?: string;
  items: Certificate[];
}

export const CertificateCardList = memo(({
  className,
  items = [],
}:CertificateCardListProps) => {
  if (!items.length) {
    return null;
  }

  return (
    <ul className={cn(styles.root, className)}>
      {items.map((item) => (
        <li key={item.id} className={styles.item}>
          <SingleCertificateCard
            id={item.id}
            title={item.title}
            href={item.href}
            image={item.image}
            price={item.price}
          />
        </li>

      ))}
    </ul>
  );
});
