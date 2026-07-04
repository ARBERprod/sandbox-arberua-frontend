import { sendEsEvent } from '@/shared/lib/analytics/esputnik';

// Fire CustomerData for a guest checkout (no user_id). eSputnik matches the contact by
// email/phone, so an identifier is required; externalCustomerId is intentionally absent and the
// wire layer omits empty identifiers. Separate from sendCustomerDataEvent, whose `user_id && email`
// guard would reject guests. Returns whether it sent; skips when neither email nor phone exists.
export const sendGuestCustomerDataEvent = (contact: {
  email?: string;
  phone: string;
  first_name: string;
  city?: string;
}): boolean => {
  if (!contact.email && !contact.phone) return false;

  sendEsEvent('CustomerData', {
    ...(contact.email ? { email: contact.email } : {}),
    first_name: contact.first_name,
    phone: contact.phone,
    ...(contact.city ? { city: contact.city } : {}),
  });
  return true;
};
