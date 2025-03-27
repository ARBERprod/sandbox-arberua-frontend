import { memo } from 'react';
import cn from 'classnames';
import { Typography } from '@/shared/ui/Typography';
import { Consultation } from '../../model/types';
import styles from './ConsultationFormatAddress.module.scss';

interface ConsultationFormatAddressProps {
  className?: string;
  consultation: Consultation;
}

export const ConsultationFormatAddress = memo(({
  className,
  consultation,
}:ConsultationFormatAddressProps) => {
  const isOnline = consultation.format === 'online';

  return (
    <div className={cn(styles.root, className)}>
      <Typography variant="body-3">{isOnline ? 'online' : 'offline'}</Typography>
      {isOnline && consultation.addresses && (
        <ul>
          {consultation.addresses.map((address) => (
            <li key={address}>
              <Typography variant="body-3" color="blue">{address}</Typography>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});
