import { useEffect, useRef } from 'react';
import { useAuth } from '@/entities/Session';
import { sendCustomerDataEvent } from '@/features/auth/lib/sendCustomerDataEvent';

// Emit CustomerData once an authenticated shopper reaches checkout. Latches only after a
// COMPLETE send: userData hydrates partially first (identifiers arrive later), so latching on
// the first truthy snapshot would send an identifier-less event and never retry. Guests skipped.
export const useCustomerDataTracking = (): void => {
  const { userData } = useAuth();
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current || !userData) return;
    if (sendCustomerDataEvent(userData)) {
      tracked.current = true;
    }
  }, [userData]);
};
