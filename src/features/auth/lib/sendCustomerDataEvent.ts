import { User } from '@/entities/User';
import { sendEsEvent } from '@/shared/lib/analytics/esputnik';

// Fire CustomerData for a real authenticated user; returns whether it sent. Skips (returns
// false, sends nothing) when the user lacks contact identifiers — userData can hydrate
// partially first, and an identifier-less CustomerData can't attach to an eSputnik contact.
// `sex` is omitted when unknown so eSputnik never receives the string "null".
export const sendCustomerDataEvent = (user: User): boolean => {
  if (!user?.user_id || !user?.email) return false;

  // User has no top-level city; take it from the primary address when available.
  const city = user.addresses?.[0]?.city?.title;

  sendEsEvent('CustomerData', {
    externalCustomerId: user.user_id,
    email: user.email,
    first_name: user.first_name,
    phone: user.phone,
    ...(city ? { city } : {}),
    ...(user.sex ? { sex: user.sex } : {}),
  });
  return true;
};
