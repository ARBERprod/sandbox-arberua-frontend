import { TableColumn } from '@/shared/ui/Table/types';
import {
  Consultation,
  ConsultationFormatAddress,
  ConsultationStatus,
} from '@/entities/Consultation';
import { TFunction } from 'i18next';
import { EditConsultationTrigger } from '@/features/consultation/EditConsultation';
import { ConsultantCard } from '@/entities/Staff';

export const officeConsultationsColumns: (t: TFunction) => TableColumn<Consultation>[] = (t) => [
  {
    header: t('office.date'),
    accessor: 'date',
    sortAccessor: 'date',
  },
  {
    header: t('office.status'),
    accessor: ({ status }) => (
      <ConsultationStatus
        status={status}
      />
    ),
  },
  {
    header: t('office.consultant'),
    accessor: ({ consultant }) => (
      <ConsultantCard
        consultant={consultant}
      />
    ),
  },
  {
    header: t('office.format_address'),
    accessor: (consultation) => (
      <ConsultationFormatAddress
        consultation={consultation}
      />
    ),
  },
];
