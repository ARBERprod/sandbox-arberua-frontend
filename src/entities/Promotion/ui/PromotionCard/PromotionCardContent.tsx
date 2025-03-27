import { useTranslation } from 'next-i18next';
import { AppImage } from '@/shared/ui/AppImage';
import { Typography } from '@/shared/ui/Typography';
import styles from './PromotionCard.module.scss';
import { PromotionsItem } from '../../model/types/Promotions';
import { memo } from 'react';

interface PromotionCardContentProps {
    promotion: PromotionsItem;
    formattedDate: string;
}

export const PromotionCardContent = memo(({ promotion, formattedDate }: PromotionCardContentProps) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.imageWrap}>
        <AppImage unoptimized alt={promotion.title} src={promotion.picture} className={styles.image} />
      </div>
      <div className={styles.info}>
        <Typography
          variant="title-5"
        >
          {promotion.title}
        </Typography>
        {
          promotion.has_seconds_until_end > 0 ? (
            <Typography
              color="red"
              variant="body-2"
              className="mt-1"
            >
              {t('end_of_promotion')}
              :
              {' '}
              {formattedDate}
            </Typography>
          ) : (
            <Typography
              color="red"
              variant="body-2"
              className="mt-1"
            >
              {t('promotion_ended')}
            </Typography>
          )
        }
        {promotion.description
            && (
              <div
                className="mt-1"
                style={{
                  fontSize: '14px',
                  color: 'black',
                }}
                dangerouslySetInnerHTML={{ __html: promotion.description }}
              />
            )}
      </div>
    </>
  );
});
