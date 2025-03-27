import { Consultation } from '@/entities/Consultation';

export type EditConsultationModalType = 'form' | 'deleting-confirm' | 'success' | null;

export interface EditConsultationSchema {
  currentModal: EditConsultationModalType;
  isModalVisible: boolean;
  consultation: Consultation | null;
}
