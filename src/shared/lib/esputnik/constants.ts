// eSputnik custom field IDs
// These IDs must be aligned with the marketing team's eSputnik configuration.
// Replace placeholder values with actual field IDs from eSputnik admin panel.
export const ESPUTNIK_FIELD_IDS = {
  EXTERNAL_ID: 0,
  LANG: 0,
  SOURCE: 0,
  REGISTRATION_AT: 0,
  BIRTHDAY: 0,
  BONUS_BALANCE: 0,
  BONUS_EXPIRE_AT: 0,
  EMAIL_CONFIRMED_AT: 0,
} as const;

// eSputnik group names
export const ESPUTNIK_GROUPS = {
  REGISTERED: 'registered',
  EMAIL_CONFIRMED: 'email_confirmed',
  CUSTOMERS: 'customers',
} as const;

// eSputnik form types
export const ESPUTNIK_FORM_TYPES = {
  REGISTRATION: 'registration',
} as const;

// eSputnik custom event keys
export const ESPUTNIK_EVENTS = {
  EMAIL_CONFIRMED: 'email_confirmed',
  PASSWORD_RESET_REQUESTED: 'password_reset_requested',
  ORDER_CONFIRMED: 'order_confirmed',
  CHECKOUT_ABANDONED: 'checkout_abandoned',
  CART_PRICE_DROP: 'cart_price_drop',
  WISHLIST_PRICE_DROP: 'wishlist_price_drop',
  BONUS_ACCRUED: 'bonus_accrued',
  BIRTHDAY_BONUS_ACCRUED: 'birthday_bonus_accrued',
  BONUS_EXPIRING_SOON: 'bonus_expiring_soon',
} as const;

// Internal API route paths
export const ESPUTNIK_API_ROUTES = {
  SUBSCRIBE: '/api/esputnik/subscribe',
  CONTACTS: '/api/esputnik/contacts',
  EVENT: '/api/esputnik/event',
} as const;
