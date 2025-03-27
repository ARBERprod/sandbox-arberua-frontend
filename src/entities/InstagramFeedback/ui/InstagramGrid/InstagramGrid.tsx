import { memo } from 'react';
import cn from 'classnames';
import { CardView } from '@/shared/types/common';
import { InstagramCard } from '../InstagramCard';
import { Instagram } from '../../model/types/types';
import styles from './InstagramGrid.module.scss';

interface InstagramGridProps {
  className?: string;
  instagrams: Instagram[];
  view: CardView;
}

export const InstagramGrid = memo(({
  className,
  instagrams,
  view,
}:InstagramGridProps) => (
  <div className={cn(styles.root, styles[view], className)}>
    {instagrams.map(
      (instagram) => (
        <InstagramCard
          className={styles.item}
          instagram={instagram}
          key={instagram.id}
        />
      ),
    )}

  </div>
));
