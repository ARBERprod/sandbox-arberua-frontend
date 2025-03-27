import { useAuthActions } from './slices/authSlice';

export const useAuthModel = () => {
  const { openLoginModal, openRegisterModal } = useAuthActions();

  return { openLoginModal, openRegisterModal };
};
