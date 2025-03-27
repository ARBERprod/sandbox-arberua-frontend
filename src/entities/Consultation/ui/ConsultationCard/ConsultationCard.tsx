import { memo, ReactElement } from 'react';
import cn from 'classnames';
import { Flex, FlexCol } from '@/shared/ui/Flex';
import { AppImage } from '@/shared/ui/AppImage';
import Link from 'next/link';
import { Typography } from '@/shared/ui/Typography';
import { StarRating } from '@/shared/ui/StarRating';
import { useTranslation } from 'next-i18next';
import { routerPaths } from '@/shared/config/router';
import { Consultation } from '../../model/types';
import styles from './ConsultationCard.module.scss';

interface ConsultationCardProps {
  className?: string;
  withDetails?: boolean;
  consultation: Consultation;

  commentSlot?: ReactElement;
}

export const ConsultationCard = memo(({
  consultation, className, commentSlot, withDetails,
}: ConsultationCardProps) => {
  const { t } = useTranslation();
  return (
    <div className={cn(styles.root, className)}>
      <Flex gap="12">
        <div className={styles.image}>
          <AppImage unoptimized alt={consultation.consultant.user_name} src={consultation.consultant.picture} />
        </div>
        <FlexCol gap="8">
          <Link href={routerPaths.seller(consultation.consultant.id)}>
            <Typography as="span" color="blue" weight={500} variant="body-2">
              {consultation.consultant.user_name}
            </Typography>
          </Link>
          {withDetails
          && (
            <>
              <Typography variant="body-3" className={styles.date}>
                {t('office.consultationDate')}
                :
                {consultation.date}
              </Typography>
              {consultation.review
                ? <StarRating value={consultation.review?.rating} readonly />
                : commentSlot}
            </>
          )}
        </FlexCol>
      </Flex>
      {(withDetails && consultation.review)
      && (
        <Typography
          variant="body-2"
          color="grey-dark"
          className={styles.comment}
        >
          {consultation.review.comment}
        </Typography>
      )}
    </div>
  );
});
