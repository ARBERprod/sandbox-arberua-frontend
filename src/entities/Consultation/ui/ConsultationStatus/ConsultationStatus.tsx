import { memo } from 'react';
import cn from 'classnames';
import { Typography } from '@/shared/ui/Typography';
import styles from './ConsultationStatus.module.scss';

interface ConsultationStatusProps {
  className?: string;
  status?: string;
}

export const ConsultationStatus = memo(({ className, status }:ConsultationStatusProps) => {
  if (!status) {
    return null;
  }

  return (
    <div className={cn(styles.root, className)}>
      <Typography variant="body-3">{status}</Typography>
    </div>
  );
});
