import { User } from '@/entities/User';

export const getUserDataForAnalytics = (user: User | null) => {
  if (!user) return null;

  const {
    email = '',
    phone: phone_number = '',
    first_name = '',
    last_name = '',
    user_id = '',
    addresses,
  } = user;

  const address = addresses?.[0] || null;

  return {
    email,
    phone_number,
    first_name,
    last_name,
    address: {
      city: address?.city || '',
      country: address?.country || 'UA',
    },
    user_id,
  };
};
