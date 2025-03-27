import { memo } from 'react';
import cn from 'classnames';
import { Flex } from '@/shared/ui/Flex';
import { AppImage } from '@/shared/ui/AppImage';
import styles from './ConsultantsPlaceholder.module.scss';
import { Staff } from '../../../../model/types';

interface ConsultantsPlaceholderProps {
  className?: string;
  consultants?: Staff[];
}

export const ConsultantsPlaceholder = memo(({
  className,
  consultants = [],
}:ConsultantsPlaceholderProps) => {
  if (!consultants.length) {
    return null;
  }

  return (
    <Flex className={cn(styles.root, className)}>
      {consultants.map((consultant) => (
        <div className={styles.image_wrap} key={consultant.id}>
          <AppImage
            unoptimized
            alt={consultant.user_name}
            src={consultant.picture}
            className={styles.image}
          />
        </div>
      ))}
    </Flex>
  );
});
