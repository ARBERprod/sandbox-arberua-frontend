import dynamic from 'next/dynamic';
import { Skeleton } from '@/shared/ui/Skeleton';

export { type Coords } from './types';

export const Map = dynamic(() => import('./Map').then(({ Map }) => Map), {
  ssr: false,
  loading: () => <Skeleton width="100%" height="100%" radius={2} />,
});
