import { useAuth } from './useAuth';

export const useUserData = () => {
  const { userData } = useAuth();

  if (!userData) throw new Error('You can use "useUserData" hook only if user is authenticated');

  return userData;
};
