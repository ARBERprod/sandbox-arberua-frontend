import { memo } from 'react';
import { LoginUserNameModal } from '../login/LoginUserNameModal';
import { LoginUserPasswordModal } from '../login/LoginUserPasswordModal';
import { RegisterModal } from '../register/RegisterModal';
import { PasswordModal } from '../password-recover/PasswordModal';
import { EmailModal } from '../password-recover/EmailModal';

export const Auth = memo(() => (
  <>
    <LoginUserNameModal />
    <LoginUserPasswordModal />
    <RegisterModal />
    <PasswordModal />
    <EmailModal />
  </>
));
