import { User } from '@/entities/User';
import { sendEsEvent } from '@/shared/lib/analytics/esputnik';

// Fire CustomerData for a real authenticated user. `sex` is omitted when unknown so
// eSputnik never receives the string "null".
export const sendCustomerDataEvent = (user: User): void => {
  sendEsEvent('CustomerData', {
    externalCustomerId: user.user_id,
    email: user.email,
    first_name: user.first_name,
    phone: user.phone,
    ...(user.sex ? { sex: user.sex } : {}),
  });
};
