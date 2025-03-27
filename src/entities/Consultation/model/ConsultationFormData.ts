import { ConsultationType } from './types';

export interface ConsultationFormData {
  type: ConsultationType;
  user_name: string;
  phone: string;
  employee_id: string;
}
