import { memo } from 'react';
import cn from 'classnames';
import { Staff } from '@/entities/Staff';
import { ConsultationOption } from '../ConsultationOption';
import styles from './ConsultationOptionList.module.scss';

interface ConsultationOptionListProps {
  className?: string;
  data: Staff[];
  activeConsultantId: string;
  onClick: (consultantId: string) => void;
}

export const ConsultationOptionList = memo(({
  className,
  data = [],
  activeConsultantId,
  onClick,
}:ConsultationOptionListProps) => {
  if (!data) {
    return null;
  }

  return (
    <ul className={cn(styles.root, className)}>
      {data.map((item) => (
        <ConsultationOption
          consultant={item}
          key={item.id}
          isCurrent={activeConsultantId === item.id}
          onClick={onClick}
        />
      ))}
    </ul>
  );
});
