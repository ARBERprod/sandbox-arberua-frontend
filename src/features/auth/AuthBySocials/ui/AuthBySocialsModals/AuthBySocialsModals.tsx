import { AuthByGoogleModal } from '../google/AuthByGoogleModal';
import { authBySocialsReducer } from '../../model/slices/authBySocialsSlice';
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader';

export const AuthBySocialsModals = () => (
  <DynamicModuleLoader reducers={{ authBySocialsSchema: authBySocialsReducer }}>
    <AuthByGoogleModal />
  </DynamicModuleLoader>
);
