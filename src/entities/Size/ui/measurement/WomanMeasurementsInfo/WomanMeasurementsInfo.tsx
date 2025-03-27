import { memo } from 'react';
import { useTranslation } from 'next-i18next';
import womanImage from '@/shared/assets/images/sizes/woman.png';
import { MeasurementsInfoBase } from '../MeasurementsInfoBase';
import { measurementsGetter } from '../../../constants/measurments';

interface WomanMeasurementsInfoProps {
  className?: string;
}

export const WomanMeasurementsInfo = memo(({ className }:WomanMeasurementsInfoProps) => {
  const { t } = useTranslation('sizes');
  return (
    <MeasurementsInfoBase className={className} picture={womanImage} content={measurementsGetter(t)} />
  );
});
