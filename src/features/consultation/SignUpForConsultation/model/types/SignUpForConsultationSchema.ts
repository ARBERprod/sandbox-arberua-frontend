import { Staff } from '@/entities/Staff';
import { ConsultationType } from '@/entities/Consultation';

export type SignUpForConsultationModalType = 'form' | 'success' | null;

export interface SignUpForConsultationSchema {
  currentModal: SignUpForConsultationModalType;
  isModalVisible: boolean;
  format: ConsultationType;
  consultantId: string;
  shopId: string;
  consultants: Staff[];
  isConsultantBlocked: boolean;
}
