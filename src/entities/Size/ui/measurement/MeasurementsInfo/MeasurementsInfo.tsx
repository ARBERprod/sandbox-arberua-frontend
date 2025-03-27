import { FC, memo } from 'react';
import { ManMeasurementsInfo } from '../ManMeasurementsInfo';
import { WomanMeasurementsInfo } from '../WomanMeasurementsInfo';
import { ShoesMeasurementsInfo } from '../ShoesMeasurementsInfo';

const measurementsMap: Record<'man' | 'woman' | 'shoes', FC<{className?: string}>> = {
  man: ManMeasurementsInfo,
  woman: WomanMeasurementsInfo,
  shoes: ShoesMeasurementsInfo,
};

interface MeasurementsInfoProps {
  className?: string;
  variant: 'man' | 'woman' | 'shoes';
}

export const MeasurementsInfo = memo(({ className, variant = 'man' }:MeasurementsInfoProps) => {
  const Component = measurementsMap[variant];
  return (
    <Component className={className} />
  );
});
