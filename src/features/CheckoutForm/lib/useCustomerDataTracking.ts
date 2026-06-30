import { useEffect, useRef } from 'react';
import { useAuth } from '@/entities/Session';
import { sendEsEvent } from '@/shared/lib/analytics/esputnik';

// Emit CustomerData once an authenticated shopper reaches checkout. Fires only for a
// real user (guests are skipped) and at most once per mount. `sex` is omitted when
// unknown so eSputnik never receives the string "null".
export const useCustomerDataTracking = (): void => {
  const { userData } = useAuth();
  const tracked = useRef(false);

  useEffect(() => {
    if (!userData || tracked.current) return;
    tracked.current = true;

    sendEsEvent('CustomerData', {
      externalCustomerId: userData.user_id,
      email: userData.email,
      first_name: userData.first_name,
      phone: userData.phone,
      ...(userData.sex ? { sex: userData.sex } : {}),
    });
  }, [userData]);
};
