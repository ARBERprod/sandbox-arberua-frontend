import { memo } from 'react';
import { AppImage } from '@/shared/ui/AppImage';
import { Typography } from '@/shared/ui/Typography';
import { Radio } from '@/shared/ui/Form/Radio';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import styles from './ConsultationOption.module.scss';
import { Staff } from '../../../../model/types';

interface ConsultationOptionProps {
  className?: string;
  consultant: Staff;
  isCurrent: boolean;
  onClick: (consultantId: string) => void;
}

export const ConsultationOption = memo(({
  className,
  consultant,
  isCurrent,
  onClick,
}:ConsultationOptionProps) => {
  const { t } = useTranslation();
  return (
    <div
      className={cn(styles.root, className)}
      onClick={() => onClick(consultant.id)}
      role="presentation"
    >
      <div className={cn(styles.wrapper, {
        [styles.active]: isCurrent,
      })}
      >
        <Radio
          hasIndents={false}
          checked={isCurrent}
          name="consultant"
          onChange={() => {}}
        />
        <div className={styles.inner}>
          <div className={styles.img_wrap}>
            <AppImage
              src={consultant.picture}
              alt={consultant.user_name}
              className={styles.image}
              unoptimized
            />
          </div>
          <div className={styles.content}>
            <Typography variant="body-2" color="blue" className={styles.title}>{consultant.user_name}</Typography>
            <Typography variant="body-3" color="grey-dark-7" className={styles.raiting}>
              {t('rating').toLowerCase()}
              {' '}
              {/* TODO: Resolve rating from BE */}
              {/* {consultant.rating} */}
            </Typography>
            <Typography variant="body-3" className={styles.address}>
              {consultant.store.title}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
});
