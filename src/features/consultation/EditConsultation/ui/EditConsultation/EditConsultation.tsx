import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader';
import { editConsultationReducer } from '../../model/slices/editConsultationSlice';
import { EditConsultationModal } from '../EditConsultationModal';
import { EditConsultationDeleteModal } from '../EditConsultationDeleteModal';
import { EditConsultationSuccessModal } from '../EditConsultationSuccessModal';

export const EditConsultation = () => (
  <DynamicModuleLoader reducers={{ editConsultation: editConsultationReducer }}>
    <EditConsultationModal />
    <EditConsultationDeleteModal />
    <EditConsultationSuccessModal />
  </DynamicModuleLoader>
);
