import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader';
import { SignUpForConsultationModal } from '../SignUpForConsultationModal';
import { SignUpForConsultationSuccessModal } from '../SignUpForConsultationSuccessModal';
import {
  signUpForConsultationReducer,
} from '../../model/slices/signUpForConsultationSlice';

export const SignUpForConsultation = () => (
  <DynamicModuleLoader reducers={{ signUpForConsultation: signUpForConsultationReducer }}>
    <SignUpForConsultationModal />
    <SignUpForConsultationSuccessModal />
  </DynamicModuleLoader>
);
