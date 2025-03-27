import { memo } from 'react';
import { useTranslation } from 'next-i18next';
import { Typography } from '@/shared/ui/Typography';
import shoePicture from '@/shared/assets/images/sizes/shoes.png';
import { MeasurementsInfoBase } from '../MeasurementsInfoBase';

interface ShoesMeasurementsInfoProps {
  className?: string;
}

export const ShoesMeasurementsInfo = memo(({ className }:ShoesMeasurementsInfoProps) => {
  const { t } = useTranslation('sizes');
  return (
    <MeasurementsInfoBase className={className} picture={shoePicture}>
      <Typography variant="body-1">
        {t('shoes_info1')}
      </Typography>
      <Typography variant="body-1" className="mt-4">
        {t('shoes_info2')}
      </Typography>
    </MeasurementsInfoBase>
  );
});
