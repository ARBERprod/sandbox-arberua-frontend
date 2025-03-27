import { memo } from 'react';
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader';
import { recoverPasswordReducer } from '../../model/slices/recoverPasswordSlice';
import { RecoverPasswordButton } from '../RecoverPasswordButton';
import { RecoverPasswordSuccessModal } from '../RecoverPasswordSuccessModal';
import { PasswordModal } from '../PasswordModal';
import { EmailModal } from '../EmailModal';

interface RecoverPasswordProps {
  className?: string;
}

export const RecoverPassword = memo(({ className }:RecoverPasswordProps) => (
  <DynamicModuleLoader reducers={{ recoverPassword: recoverPasswordReducer }}>
    <RecoverPasswordButton className={className} />
    <RecoverPasswordSuccessModal />
    <PasswordModal />
    <EmailModal />
  </DynamicModuleLoader>
));
