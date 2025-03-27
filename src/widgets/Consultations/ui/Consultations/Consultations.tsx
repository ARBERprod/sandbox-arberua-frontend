import { memo } from 'react';
import cn from 'classnames';
import { Typography } from '@/shared/ui/Typography';
import { Flex } from '@/shared/ui/Flex';
import { useTranslation } from 'next-i18next';
import { SignUpForConsultation, SignUpForConsultationTrigger } from '@/features/consultation/SignUpForConsultation';
import styles from './Consultations.module.scss';
import { Staff } from '@/entities/Staff';

interface ConsultationsProps {
  consultants: Staff[];
  shopId: string;
  className?: string;
  fullwidth?: boolean;
  consultantId?: string;
  isConsultantPredefined?: true;
}

export const Consultations = memo(({
  className,
  consultantId,
  shopId,
  fullwidth,
  consultants = [],
  isConsultantPredefined,
}: ConsultationsProps) => {
  const { t } = useTranslation('consultations');
  return (
    <div className={cn(styles.root, className)}>
      <Typography variant="title-5" centered className={styles.title}>
        {t('consultations.title')}
      </Typography>
      <Flex className={styles.wrapper} justify="center">
        <Flex
          className={cn(styles.inner, {
            [styles.fullwidth]: fullwidth,
          })}
          justify="center"
          gap="8"
        >
          <Flex className={styles.item} justify="center" align="center" direction="column">
            <Typography variant="body-1" centered className={styles.item_title}>
              {t(
                'consultations.online_title',
              )}
            </Typography>
            <Typography variant="body-3" centered className={styles.item_subtitle}>
              {t('consultations.subtitle')}
            </Typography>
            <SignUpForConsultationTrigger
              shopId={shopId}
              consultants={consultants}
              consultantId={consultantId}
              className={styles.button}
              isConsultantPredefined={isConsultantPredefined}
              format="online"
            />
          </Flex>
        </Flex>
      </Flex>
      <SignUpForConsultation />
    </div>
  );
});
