import { useAuth } from './useAuth';

export const useUserId = () => {
  const { userData } = useAuth();

  if (!userData) return null;

  const userId = userData?.user_id;

  return userId;
};
