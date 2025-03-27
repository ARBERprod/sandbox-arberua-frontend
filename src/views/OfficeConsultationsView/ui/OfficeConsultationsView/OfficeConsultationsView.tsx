import { memo } from 'react';
import cn from 'classnames';

import { EditConsultation } from '@/features/consultation/EditConsultation';
import { ConsultationsTable } from '../ConsultationsTable';
import { ConsultationsList } from '../ConsultationsList';
import styles from './OfficeConsultationsView.module.scss';

interface OfficeConsultationsViewProps {
  className?: string;
}

export const OfficeConsultationsView = memo(({ className }:OfficeConsultationsViewProps) => (
  <div className={cn(styles.root, className)}>
    <ConsultationsTable className="hide-mobile" />
    <ConsultationsList className="hide-tablet-desktop" />
    <EditConsultation />
  </div>
));
