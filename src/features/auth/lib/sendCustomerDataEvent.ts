import { User } from '@/entities/User';
import { sendEsEvent } from '@/shared/lib/analytics/esputnik';

// eSputnik CustomerData payload — identifies the authenticated shopper for web-tracking.
// It does NOT create/update a contact (the backend owns that via UpdateEsputnikContactJob).
declare module '@/shared/lib/analytics/esputnik' {
  interface EsEventPayloadMap {
    CustomerData: {
      externalCustomerId: string;
      email: string;
      first_name: string;
      phone: string;
      sex?: string;
    };
  }
}

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
