import { MeasurementItem } from '@/entities/Size/model/types';
import { TFunction } from 'i18next';

export const measurementsGetter: (t: TFunction<'sizes'>) => MeasurementItem[] = (t) => [
  {
    title: t('neck_girth'),
    content: t('neck_info'),
  },
  {
    title: t('bust'),
    content: t('chest_info'),
  },
  {
    title: t('waist'),
    content: t('waist_info'),
  },
  {
    title: t('hip_girth'),
    content: t('hips_info'),
  },
  {
    title: `${t('height')} ARBER`,
    content: t('height_info'),
  },
];
