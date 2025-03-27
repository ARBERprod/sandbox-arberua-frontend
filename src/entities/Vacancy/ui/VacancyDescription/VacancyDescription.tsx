import { memo } from 'react';
import cn from 'classnames';
import { Typography } from '@/shared/ui/Typography';
import { Vacancy } from '../../model/types';

import styles from './VacancyDescription.module.scss';

interface VacancyDescriptionProps {
  className?: string;
  vacancy: Vacancy;
}

export const VacancyDescription = memo(({
  vacancy,
  className,
}: VacancyDescriptionProps) => (
  <div className={cn(styles.root, className)}>
    <Typography variant="body-2">{vacancy.content}</Typography>
  </div>
));
