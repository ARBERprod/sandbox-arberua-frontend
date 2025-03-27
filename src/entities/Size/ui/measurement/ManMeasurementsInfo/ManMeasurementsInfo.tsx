import { memo } from 'react';
import { useTranslation } from 'next-i18next';
import manImage from '@/shared/assets/images/sizes/man.png';
import { MeasurementsInfoBase } from '../MeasurementsInfoBase';
import { measurementsGetter } from '../../../constants/measurments';

interface ManMeasurementsInfoProps {
  className?: string;
}

export const ManMeasurementsInfo = memo(({ className }: ManMeasurementsInfoProps) => {
  const { t } = useTranslation('sizes');
  return (
    <MeasurementsInfoBase className={className} picture={manImage} content={measurementsGetter(t)} />
  );
});
